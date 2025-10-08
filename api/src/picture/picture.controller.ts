import { Controller, Get, Param, Post, Delete, UseInterceptors, UploadedFiles, Req, HttpException, HttpStatus } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { PictureService } from './picture.service';

@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get('category/:categoryId')
  async getPicturesByCategory(@Param('categoryId') categoryId: string) {
    return await this.pictureService.getPicturesByCategory(categoryId);
  }

  @Post('subcategory/:categoryId/pictures')
  @UseInterceptors(AnyFilesInterceptor())
  async addPicturesToSubcategory(
    @Param('categoryId') categoryId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any
  ) {
    try {
      const formData = req.body;
      const pictures: { file: Express.Multer.File; tags: string[] }[] = [];
      
      // Parse pictures 
      const pictureIndices = new Set<string>();
      Object.keys(formData).forEach(key => {
        const match = key.match(/^pictures\[(\d+)\]\.tags$/);
        if (match) {
          pictureIndices.add(match[1]);
        }
      });
      
      // Process each picture
      for (const pictureIndex of pictureIndices) {
        const pictureFile = files.find(f => f.fieldname === `pictures[${pictureIndex}].file`);
        const tagsString = formData[`pictures[${pictureIndex}].tags`];
        
        if (pictureFile) {
          let tags: string[] = [];
          if (tagsString) {
            try {
              tags = JSON.parse(tagsString);
            } catch (error) {
              // Skip invalid tag data
            }
          }
          
          pictures.push({
            file: pictureFile,
            tags,
          });
        }
      }
      
      return await this.pictureService.addPicturesToSubcategory(
        pictures,
        categoryId,
        formData.folderId,
        formData.brideId
      );
    } catch (error) {
      console.error('Error uploading pictures to subcategory:', error);
      throw new HttpException(
        'Failed to upload pictures',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deletePicture(@Param('id') id: string): Promise<void> {
    try {
      await this.pictureService.deletePicture(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete picture',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
