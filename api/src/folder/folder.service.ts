import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { FolderResponseDto, SubcategoryResponseDto } from './dto/folder-response.dto';
import { PictureService, PictureUploadData } from '../picture/picture.service';
import { TagService } from '../tag/tag.service';
import { Express } from 'express';
import { createClient } from '@supabase/supabase-js';

export interface SubcategoryData {
  name: string;
  icon?: Express.Multer.File;
  pictures: {
    file: Express.Multer.File;
    tags: string[];
  }[];
}

@Injectable()
export class FolderService {
  private supabase;

  constructor(
    private prisma: PrismaService,
    private pictureService: PictureService,
    private tagService: TagService,
  ) {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  async createFolder(
    createFolderDto: CreateFolderDto,
    files: Express.Multer.File[],
    subcategoriesData: SubcategoryData[]
  ): Promise<FolderResponseDto> {
    const { name, brideId, iconPicture, hasSubcategories } = createFolderDto;

    // Track uploaded files for cleanup
    const uploadedFiles: string[] = [];

    try {
      return await this.prisma.$transaction(async (tx) => {
        try {
          // Process folder icon if provided
          let folderIconUrl: string | undefined;
          if (iconPicture) {
            const folderIconFile = files.find(f => f.fieldname === 'folderIcon');
            if (folderIconFile) {
              const processedIcon = await this.pictureService.processAndSaveIcon(
                {
                  buffer: folderIconFile.buffer,
                  originalName: folderIconFile.originalname,
                  mimeType: folderIconFile.mimetype,
                },
                'folder'
              );
              folderIconUrl = processedIcon.url;
              uploadedFiles.push(processedIcon.url);
            }
          }

          // Create the folder FIRST
          const folder = await tx.folder.create({
            data: {
              name,
              brideId: brideId || null,
              iconPicture: folderIconUrl,
            },
          });

          let createdSubcategories: SubcategoryResponseDto[] = [];

          if (hasSubcategories && subcategoriesData && subcategoriesData.length > 0) {
            // Create subcategories
            for (const subcategoryData of subcategoriesData) {
              // Process subcategory icon if provided
              let subcategoryIconUrl: string | undefined;
              if (subcategoryData.icon) {
                const processedIcon = await this.pictureService.processAndSaveIcon(
                  {
                    buffer: subcategoryData.icon.buffer,
                    originalName: subcategoryData.icon.originalname,
                    mimeType: subcategoryData.icon.mimetype,
                  },
                  'category'
                );
                subcategoryIconUrl = processedIcon.url;
                uploadedFiles.push(processedIcon.url);
              }

              // Create subcategory
              const category = await tx.category.create({
                data: {
                  name: subcategoryData.name,
                  iconPicture: subcategoryIconUrl,
                  folderId: folder.id,
                },
              });

              // Process pictures for this subcategory
              if (subcategoryData.pictures && subcategoryData.pictures.length > 0) {
                for (const pictureData of subcategoryData.pictures) {
                  // Process and save picture WITHIN transaction
                  const processedPicture = await this.pictureService.processAndSavePictureInTransaction(
                    tx, // Pass the transaction
                    {
                      buffer: pictureData.file.buffer,
                      originalName: pictureData.file.originalname,
                      mimeType: pictureData.file.mimetype,
                    },
                    category.id,
                    brideId,
                    folder.id
                  );

                  // Track uploaded files
                  uploadedFiles.push(processedPicture.url);
                  uploadedFiles.push(processedPicture.thumbnailUrl);

                  // Assign tags if provided
                  if (pictureData.tags && pictureData.tags.length > 0) {
                    await this.tagService.assignTagsToPicture(processedPicture.id, pictureData.tags);
                  }
                }
              }

              createdSubcategories.push({
                id: category.id,
                name: category.name,
                iconPicture: category.iconPicture,
                folderId: category.folderId,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
              });
            }
          }

          return {
            ...folder,
            subcategories: createdSubcategories,
          };
        } catch (error) {
          // Clean up uploaded files on failure
          await this.cleanupUploadedFiles(uploadedFiles);
          throw error;
        }
      });
    } catch (error) {
      // Clean up any remaining uploaded files
      await this.cleanupUploadedFiles(uploadedFiles);
      throw new Error(`Failed to create folder: ${error.message}`);
    }
  }

  async getAllFolders(): Promise<FolderResponseDto[]> {
    return await this.prisma.folder.findMany({
      include: {
        categories: true,
      },
    });
  }

  async getFolderById(id: string): Promise<FolderResponseDto | null> {
    const folder = await this.prisma.folder.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });

    if (!folder) {
      return null;
    }

    return folder;
  }

  async updateFolder(id: string, updateData: Partial<CreateFolderDto>): Promise<FolderResponseDto> {
    const updatedFolder = await this.prisma.folder.update({
      where: { id },
      data: updateData,
      include: {
        categories: true,
      },
    });

    return updatedFolder;
  }

  async deleteFolder(id: string): Promise<void> {
    await this.prisma.folder.delete({
      where: { id },
    });
  }

  // Add cleanup method
  private async cleanupUploadedFiles(fileUrls: string[]): Promise<void> {
    for (const url of fileUrls) {
      try {
        // Extract file path from URL and delete from storage
        const filePath = url.split('/').pop();
        if (filePath) {
          await this.supabase.storage.from('pictures').remove([filePath]);
        }
      } catch (error) {
        console.warn(`Failed to cleanup file ${url}:`, error);
      }
    }
  }
}
