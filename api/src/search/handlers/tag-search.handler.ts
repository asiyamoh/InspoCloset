import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { TagSearchResult } from '../dto/search-response.dto';

@Injectable()
export class TagSearchHandler {
  constructor(private prisma: PrismaService) {}

  async searchTags(query: string, limit: number = 10): Promise<TagSearchResult[]> {
    if (!query.trim()) {
      return [];
    }

    // Search for tags that match the query (case-insensitive, partial match)
    const tags = await this.prisma.tag.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        pictureTags: {
          include: {
            picture: {
              select: {
                id: true,
                url: true,
                thumbnailUrl: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    // Transform the results to match our response format
    return tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      pictureCount: tag.pictureTags.length,
      pictures: tag.pictureTags.map(pt => ({
        id: pt.picture.id,
        url: pt.picture.url,
        thumbnailUrl: pt.picture.thumbnailUrl,
      })),
    }));
  }
}
