import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async createTag(name: string): Promise<{ id: string; name: string }> {
    // Check if tag already exists
    const existingTag = await this.prisma.tag.findFirst({
      where: { name: name.toLowerCase().trim() },
    });

    if (existingTag) {
      return existingTag;
    }

    // Create new tag
    return await this.prisma.tag.create({
      data: {
        name: name.toLowerCase().trim(),
      },
    });
  }

  async getMostUsedTags(limit: number = 3): Promise<{ id: string; name: string; count: number }[]> {
    const result = await this.prisma.tag.findMany({
      include: {
        pictureTags: true,
      },
      orderBy: {
        pictureTags: {
          _count: 'desc',
        },
      },
      take: limit,
    });

    return result.map(tag => ({
      id: tag.id,
      name: tag.name,
      count: tag.pictureTags.length,
    }));
  }

  async assignTagsToPicture(pictureId: string, tagNames: string[]): Promise<void> {
    if (tagNames.length === 0) return;

    // Create tags if they don't exist
    const tags = await Promise.all(
      tagNames.map(name => this.createTag(name))
    );

    // Create picture-tag relationships
    await this.prisma.pictureTag.createMany({
      data: tags.map(tag => ({
        pictureId,
        tagId: tag.id,
      })),
      skipDuplicates: true,
    });
  }

  async getTagsByPicture(pictureId: string) {
    return await this.prisma.tag.findMany({
      where: {
        pictureTags: {
          some: {
            pictureId,
          },
        },
      },
    });
  }

  async removeTagFromPicture(pictureId: string, tagId: string): Promise<void> {
    await this.prisma.pictureTag.deleteMany({
      where: {
        pictureId,
        tagId,
      },
    });
  }
}
