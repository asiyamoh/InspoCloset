import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FolderModule } from './folder/folder.module';
import { PictureModule } from './picture/picture.module';
import { TagModule } from './tag/tag.module';
import { UserFavoriteFolderModule } from './user-favorite-folder/user-favorite-folder.module';
import { BrideModule } from './bride/bride.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    FolderModule,
    PictureModule,
    TagModule,
    UserFavoriteFolderModule,
    BrideModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
