import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException, UseInterceptors, UploadedFiles, Req, UseGuards } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FolderService, SubcategoryData } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { FolderResponseDto } from './dto/folder-response.dto';
import { CategoryData } from './dto/create-category.dto';
import { AuthGuard } from '../auth/supabase-auth.guard';

@Controller('folders')
@UseGuards(AuthGuard)
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createFolder(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any
  ): Promise<FolderResponseDto> {
    try {
      // Get profileId from authenticated user
      const profileId = req.user.id;
      
      // Parse FormData
      const formData = req.body;
      
      // Extract folder metadata
      const createFolderDto: CreateFolderDto = {
        name: formData.folderName,
        brideId: formData.brideId || undefined,
        iconPicture: formData.folderIcon ? 'uploaded' : undefined,
        hasSubcategories: formData.hasSubcategories === 'true',
        profileId: profileId, // Use authenticated user's profileId
      };

      // Parse subcategories data
      const subcategoriesData: SubcategoryData[] = [];
      
      if (createFolderDto.hasSubcategories) {
        // Find all subcategory indices
        const subcategoryIndices = new Set<string>();
        Object.keys(formData).forEach(key => {
          const match = key.match(/^subcategories\[(\d+)\]\.name$/);
          if (match) {
            subcategoryIndices.add(match[1]);
          }
        });

        // Process each subcategory
        for (const index of subcategoryIndices) {
          const subcategoryName = formData[`subcategories[${index}].name`];
          
          // Find subcategory icon file
          const subcategoryIconFile = files.find(f => f.fieldname === `subcategories[${index}].icon`);
          
          // Find pictures for this subcategory
          const pictures: { file: Express.Multer.File; tags: string[] }[] = [];
          const pictureIndices = new Set<string>();
          
          Object.keys(formData).forEach(key => {
            const match = key.match(new RegExp(`^subcategories\\[${index}\\]\\.pictures\\[(\\d+)\\]\\.tags$`));
            if (match) {
              pictureIndices.add(match[1]);
            }
          });

          // Process each picture for this subcategory
          for (const pictureIndex of pictureIndices) {
            const pictureFile = files.find(f => f.fieldname === `subcategories[${index}].pictures[${pictureIndex}].file`);
            const tagsString = formData[`subcategories[${index}].pictures[${pictureIndex}].tags`];
            
            if (pictureFile) {
              let tags: string[] = [];
              if (tagsString) {
                try {
                  tags = JSON.parse(tagsString);
                } catch (error) {
                  console.warn(`Failed to parse tags for subcategory ${index}, picture ${pictureIndex}:`, error);
                }
              }
              
              pictures.push({
                file: pictureFile,
                tags,
              });
            }
          }

          subcategoriesData.push({
            name: subcategoryName,
            icon: subcategoryIconFile,
            pictures,
          });
        }
      }

      return await this.folderService.createFolder(createFolderDto, files, subcategoriesData, createFolderDto.profileId);
    } catch (error) {
      console.error('Error creating folder:', error);
      throw new HttpException(
        'Failed to create folder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':folderId/categories')
  @UseInterceptors(AnyFilesInterceptor())
  async addCategoriesToFolder(
    @Param('folderId') folderId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any
  ) {
    try {
      // Parse FormData
      const formData = req.body;
      
      // Parse categories data
      const categoriesData: CategoryData[] = [];
      
      // Find all category indices
      const categoryIndices = new Set<string>();
      Object.keys(formData).forEach(key => {
        const match = key.match(/^categories\[(\d+)\]\.name$/);
        if (match) {
          categoryIndices.add(match[1]);
        }
      });

      // Process each category
      for (const index of categoryIndices) {
        const categoryName = formData[`categories[${index}].name`];
        
        // Find category icon file
        const categoryIconFile = files.find(f => f.fieldname === `categories[${index}].icon`);
        
        // Find pictures for this category
        const pictures: { file: Express.Multer.File; tags: string[] }[] = [];
        const pictureIndices = new Set<string>();
        
        Object.keys(formData).forEach(key => {
          const match = key.match(new RegExp(`^categories\\[${index}\\]\\.pictures\\[(\\d+)\\]\\.tags$`));
          if (match) {
            pictureIndices.add(match[1]);
          }
        });

        // Process each picture for this category
        for (const pictureIndex of pictureIndices) {
          const pictureFile = files.find(f => f.fieldname === `categories[${index}].pictures[${pictureIndex}].file`);
          const tagsString = formData[`categories[${index}].pictures[${pictureIndex}].tags`];
          
          if (pictureFile) {
            let tags: string[] = [];
            if (tagsString) {
              try {
                tags = JSON.parse(tagsString);
              } catch (error) {
                console.warn(`Failed to parse tags for category ${index}, picture ${pictureIndex}:`, error);
              }
            }
            
            pictures.push({
              file: pictureFile,
              tags,
            });
          }
        }

        categoriesData.push({
          name: categoryName,
          icon: categoryIconFile,
          pictures,
        });
      }

      return await this.folderService.addCategoriesToFolder(
        folderId,
        categoriesData
      );
    } catch (error) {
      console.error('Error adding categories to folder:', error);
      throw new HttpException(
        'Failed to add categories to folder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllFolders(): Promise<FolderResponseDto[]> {
    try {
      return await this.folderService.getAllFolders();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch folders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:profileId')
  async getFoldersByProfile(@Param('profileId') profileId: string): Promise<FolderResponseDto[]> {
    try {
      return await this.folderService.getFoldersByProfile(profileId);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user folders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getFolderById(@Param('id') id: string): Promise<FolderResponseDto> {
    try {
      const folder = await this.folderService.getFolderById(id);
      if (!folder) {
        throw new HttpException('Folder not found', HttpStatus.NOT_FOUND);
      }
      return folder;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch folder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @UseInterceptors(AnyFilesInterceptor())
  async updateFolder(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any
  ): Promise<FolderResponseDto> {
    try {
      // Parse FormData
      const formData = req.body;
      
      // Extract folder metadata
      const updateData: Partial<CreateFolderDto> = {
        name: formData.name,
      };

      // Find icon file if provided
      const iconFile = files?.find(f => f.fieldname === 'icon');

      return await this.folderService.updateFolder(id, updateData, iconFile);
    } catch (error) {
      throw new HttpException(
        'Failed to update folder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteFolder(@Param('id') id: string): Promise<void> {
    try {
      await this.folderService.deleteFolder(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete folder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('subcategory/:subcategoryId')
  @UseInterceptors(AnyFilesInterceptor())
  async updateSubcategory(
    @Param('subcategoryId') subcategoryId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any
  ) {
    try {
      const formData = req.body;
      
      // Extract update data
      const updateData: UpdateSubcategoryDto = {
        name: formData.name,
      };

      // Find icon file if provided
      const iconFile = files?.find(f => f.fieldname === 'icon');

      return await this.folderService.updateSubcategory(subcategoryId, updateData, iconFile);
    } catch (error) {
      console.error('Error updating subcategory:', error);
      throw new HttpException(
        'Failed to update subcategory',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('subcategory/:subcategoryId')
  async deleteSubcategory(@Param('subcategoryId') subcategoryId: string): Promise<void> {
    try {
      await this.folderService.deleteSubcategory(subcategoryId);
    } catch (error) {
      throw new HttpException(
        'Failed to delete subcategory',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
