import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app.config.module';
import { DatabaseModule } from './database/database.module';
import { FolderModule } from './folder/folder.module';
import { PictureModule } from './picture/picture.module';
import { TagModule } from './tag/tag.module';
import { UserFavoriteFolderModule } from './user-favorite-folder/user-favorite-folder.module';
import { BrideModule } from './bride/bride.module';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
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
