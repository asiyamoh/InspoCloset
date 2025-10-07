import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class UserFavoriteFolderService {
  constructor(private prisma: PrismaService) {}

  async toggleFavorite(profileId: string, folderId: string): Promise<{ isFavorite: boolean; message: string }> {
    // Check if the folder exists
    const folder = await this.prisma.folder.findUnique({
      where: { id: folderId },
    });

    if (!folder) {
      throw new Error('Folder not found');
    }

    // Check if already favorited
    const existingFavorite = await this.prisma.userFavoriteFolder.findUnique({
      where: {
        profileId_folderId: {
          profileId,
          folderId,
        },
      },
    });

    if (existingFavorite) {
      // Remove from favorites
      await this.prisma.userFavoriteFolder.delete({
        where: {
          profileId_folderId: {
            profileId,
            folderId,
          },
        },
      });
      return { isFavorite: false, message: 'Folder removed from favorites' };
    } else {
      // Check if user already has 2 favorites
      const favoriteCount = await this.prisma.userFavoriteFolder.count({
        where: { profileId },
      });

      if (favoriteCount >= 2) {
        throw new Error('You can only have 2 favorite folders');
      }

      // Add to favorites
      await this.prisma.userFavoriteFolder.create({
        data: {
          profileId,
          folderId,
        },
      });
      return { isFavorite: true, message: 'Folder added to favorites' };
    }
  }

  async getFavoritesByProfile(profileId: string): Promise<any[]> {
    return await this.prisma.userFavoriteFolder.findMany({
      where: { profileId },
      include: {
        folder: {
          include: {
            categories: true,
            pictureLocations: {
              include: {
                picture: {
                  include: {
                    pictureTags: {
                      include: {
                        tag: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async isFolderFavorited(profileId: string, folderId: string): Promise<boolean> {
    const favorite = await this.prisma.userFavoriteFolder.findUnique({
      where: {
        profileId_folderId: {
          profileId,
          folderId,
        },
      },
    });
    return !!favorite;
  }
}
