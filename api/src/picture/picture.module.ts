import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { ImageProcessingService } from './image-processing.service';
import { DatabaseModule } from '../database/database.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [DatabaseModule, TagModule],
  controllers: [],
  providers: [PictureService, ImageProcessingService],
  exports: [PictureService, ImageProcessingService],
})
export class PictureModule {}
