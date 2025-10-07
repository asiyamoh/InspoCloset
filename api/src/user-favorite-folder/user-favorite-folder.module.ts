import { Module } from '@nestjs/common';
import { UserFavoriteFolderController } from './user-favorite-folder.controller';
import { UserFavoriteFolderService } from './user-favorite-folder.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserFavoriteFolderController],
  providers: [UserFavoriteFolderService],
  exports: [UserFavoriteFolderService],
})
export class UserFavoriteFolderModule {}
