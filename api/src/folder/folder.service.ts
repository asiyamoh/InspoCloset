import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { FolderResponseDto, SubcategoryResponseDto } from './dto/folder-response.dto';
import { PictureService, PictureUploadData } from '../picture/picture.service';
import { TagService } from '../tag/tag.service';
import { Express } from 'express';
import { createClient } from '@supabase/supabase-js';
import { CategoryData } from './dto/create-category.dto';

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
    subcategoriesData: SubcategoryData[],
    profileId: string = "bf24ad7d-89c9-46c4-a59d-8fa054eb35ad"
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
              profileId,
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
                    await this.tagService.assignTagsToPicture(processedPicture.id, pictureData.tags, tx);
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

  async getFoldersByProfile(profileId: string): Promise<FolderResponseDto[]> {
    return await this.prisma.folder.findMany({
      where: { profileId },
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

  async updateFolder(id: string, updateData: Partial<CreateFolderDto>, iconFile?: Express.Multer.File): Promise<FolderResponseDto> {
    // Track uploaded files for cleanup
    const uploadedFiles: string[] = [];

    try {
      return await this.prisma.$transaction(async (tx) => {
        try {
          // Get current folder to check for existing icon
          const currentFolder = await tx.folder.findUnique({
            where: { id },
          });

          if (!currentFolder) {
            throw new Error('Folder not found');
          }

          // Process new icon if provided
          let newIconUrl: string | undefined;
          if (iconFile) {
            const processedIcon = await this.pictureService.processAndSaveIcon(
              {
                buffer: iconFile.buffer,
                originalName: iconFile.originalname,
                mimeType: iconFile.mimetype,
              },
              'folder'
            );
            newIconUrl = processedIcon.url;
            uploadedFiles.push(processedIcon.url);
          }

          // Update folder
          const updatedFolder = await tx.folder.update({
            where: { id },
            data: {
              name: updateData.name || currentFolder.name,
              iconPicture: newIconUrl || currentFolder.iconPicture,
            },
            include: {
              categories: true,
            },
          });

          // Clean up old icon if new one was uploaded
          if (iconFile && currentFolder.iconPicture) {
            try {
              const oldFilePath = currentFolder.iconPicture.split('/').pop();
              if (oldFilePath) {
                await this.supabase.storage.from('pictures').remove([oldFilePath]);
              }
            } catch (error) {
              console.warn(`Failed to cleanup old icon ${currentFolder.iconPicture}:`, error);
            }
          }

          return updatedFolder;
        } catch (error) {
          // Clean up uploaded files on failure
          await this.cleanupUploadedFiles(uploadedFiles);
          throw error;
        }
      });
    } catch (error) {
      // Clean up any remaining uploaded files
      await this.cleanupUploadedFiles(uploadedFiles);
      throw new Error(`Failed to update folder: ${error.message}`);
    }
  }

  async deleteFolder(id: string): Promise<void> {
    await this.prisma.folder.delete({
      where: { id },
    });
  }

  async updateSubcategory(
    subcategoryId: string, 
    updateData: UpdateSubcategoryDto, 
    iconFile?: Express.Multer.File
  ): Promise<SubcategoryResponseDto> {
    // Track uploaded files for cleanup
    const uploadedFiles: string[] = [];

    try {
      return await this.prisma.$transaction(async (tx) => {
        try {
          // Get current subcategory to check for existing icon
          const currentSubcategory = await tx.category.findUnique({
            where: { id: subcategoryId },
          });

          if (!currentSubcategory) {
            throw new Error('Subcategory not found');
          }

          // Process new icon if provided
          let newIconUrl: string | undefined;
          if (iconFile) {
            const processedIcon = await this.pictureService.processAndSaveIcon(
              {
                buffer: iconFile.buffer,
                originalName: iconFile.originalname,
                mimeType: iconFile.mimetype,
              },
              'category'
            );
            newIconUrl = processedIcon.url;
            uploadedFiles.push(processedIcon.url);
          }

          // Update subcategory
          const updatedSubcategory = await tx.category.update({
            where: { id: subcategoryId },
            data: {
              name: updateData.name || currentSubcategory.name,
              iconPicture: newIconUrl || currentSubcategory.iconPicture,
            },
          });

          // Clean up old icon if new one was uploaded
          if (iconFile && currentSubcategory.iconPicture) {
            try {
              const oldFilePath = currentSubcategory.iconPicture.split('/').pop();
              if (oldFilePath) {
                await this.supabase.storage.from('pictures').remove([oldFilePath]);
              }
            } catch (error) {
              console.warn(`Failed to cleanup old icon ${currentSubcategory.iconPicture}:`, error);
            }
          }

          return {
            id: updatedSubcategory.id,
            name: updatedSubcategory.name,
            iconPicture: updatedSubcategory.iconPicture,
            folderId: updatedSubcategory.folderId,
            createdAt: updatedSubcategory.createdAt,
            updatedAt: updatedSubcategory.updatedAt,
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
      throw new Error(`Failed to update subcategory: ${error.message}`);
    }
  }

  async deleteSubcategory(subcategoryId: string): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        // Get subcategory with pictures to clean up files
        const subcategory = await tx.category.findUnique({
          where: { id: subcategoryId },
          include: {
            pictureLocations: {
              include: {
                picture: {
                  include: {
                    pictureTags: {
                      include: {
                        tag: true
                      }
                    }
                  }
                }
              }
            },
          },
        });

        if (!subcategory) {
          throw new Error('Subcategory not found');
        }

        // Collect file URLs for cleanup
        const fileUrls: string[] = [];
        
        // Add subcategory icon if it exists
        if (subcategory.iconPicture) {
          fileUrls.push(subcategory.iconPicture);
        }

        // Add picture URLs
        subcategory.pictureLocations.forEach(pictureLocation => {
          if (pictureLocation.picture.url) fileUrls.push(pictureLocation.picture.url);
          if (pictureLocation.picture.thumbnailUrl) fileUrls.push(pictureLocation.picture.thumbnailUrl);
        });

        // Delete the subcategory (this will cascade delete pictures and picture tags)
        await tx.category.delete({
          where: { id: subcategoryId },
        });

        // Clean up files from storage
        await this.cleanupUploadedFiles(fileUrls);
      });
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      throw new Error(`Failed to delete subcategory: ${error.message}`);
    }
  }

  async addCategoriesToFolder(
    folderId: string,
    categoriesData: CategoryData[],
    brideId?: string,
    profileId: string = "bf24ad7d-89c9-46c4-a59d-8fa054eb35ad"
  ): Promise<{
    success: boolean;
    createdCategories: SubcategoryResponseDto[];
    errors: Array<{ categoryName: string; error: string }>;
  }> {
    const uploadedFiles: string[] = [];
    const createdCategories: SubcategoryResponseDto[] = [];
    const errors: Array<{ categoryName: string; error: string }> = [];

    try {
      return await this.prisma.$transaction(async (tx) => {
        try {
          // Verify folder exists
          const folder = await tx.folder.findUnique({
            where: { id: folderId },
          });

          if (!folder) {
            throw new Error('Folder not found');
          }

          // Process each category
          for (const categoryData of categoriesData) {
            try {
              // Process category icon if provided
              let categoryIconUrl: string | undefined;
              if (categoryData.icon) {
                const processedIcon = await this.pictureService.processAndSaveIcon(
                  {
                    buffer: categoryData.icon.buffer,
                    originalName: categoryData.icon.originalname,
                    mimeType: categoryData.icon.mimetype,
                  },
                  'category'
                );
                categoryIconUrl = processedIcon.url;
                uploadedFiles.push(processedIcon.url);
              }

              // Create category
              const category = await tx.category.create({
                data: {
                  name: categoryData.name,
                  iconPicture: categoryIconUrl,
                  folderId: folderId,
                },
              });

              // Process pictures for this category
              if (categoryData.pictures && categoryData.pictures.length > 0) {
                for (const pictureData of categoryData.pictures) {
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
                    folderId
                  );

                  // Track uploaded files
                  uploadedFiles.push(processedPicture.url);
                  uploadedFiles.push(processedPicture.thumbnailUrl);

                  // Assign tags if provided
                  if (pictureData.tags && pictureData.tags.length > 0) {
                    await this.tagService.assignTagsToPicture(processedPicture.id, pictureData.tags, tx);
                  }
                }
              }

              createdCategories.push({
                id: category.id,
                name: category.name,
                iconPicture: category.iconPicture,
                folderId: category.folderId,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
              });
            } catch (error) {
              errors.push({
                categoryName: categoryData.name,
                error: error instanceof Error ? error.message : 'Unknown error'
              });
            }
          }

          return {
            success: errors.length === 0,
            createdCategories,
            errors,
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
      throw new Error(`Failed to add categories to folder: ${error.message}`);
    }
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
