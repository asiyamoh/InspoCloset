import { Controller, Get, Put, Param, HttpStatus, HttpException } from '@nestjs/common';
import { UserFavoriteFolderService } from './user-favorite-folder.service';

@Controller('user-favorite-folders')
export class UserFavoriteFolderController {
  constructor(private readonly userFavoriteFolderService: UserFavoriteFolderService) {}

  @Put('toggle/:folderId')
  async toggleFavorite(@Param('folderId') folderId: string) {
    try {
      const defaultProfileId = 'bf24ad7d-89c9-46c4-a59d-8fa054eb35ad';
      const result = await this.userFavoriteFolderService.toggleFavorite(defaultProfileId, folderId);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to toggle favorite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('favorites')
  async getFavorites() {
    try {
      const defaultProfileId = 'bf24ad7d-89c9-46c4-a59d-8fa054eb35ad';
      const favorites = await this.userFavoriteFolderService.getFavoritesByProfile(defaultProfileId);
      return favorites;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('check/:folderId')
  async checkFavoriteStatus(@Param('folderId') folderId: string) {
    try {
      const defaultProfileId = 'bf24ad7d-89c9-46c4-a59d-8fa054eb35ad';
      const isFavorited = await this.userFavoriteFolderService.isFolderFavorited(defaultProfileId, folderId);
      return { isFavorited };
    } catch (error) {
      throw new HttpException(
        'Failed to check favorite status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
