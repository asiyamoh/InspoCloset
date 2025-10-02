import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { DatabaseModule } from '../database/database.module';
import { PictureModule } from '../picture/picture.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [DatabaseModule, PictureModule, TagModule],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService],
})
export class FolderModule {}
