import { Controller, Get, Put, Param, HttpStatus, HttpException, UseGuards, Req } from '@nestjs/common';
import { UserFavoriteFolderService } from './user-favorite-folder.service';
import { AuthGuard } from '../auth/supabase-auth.guard';

@Controller('user-favorite-folders')
@UseGuards(AuthGuard)
export class UserFavoriteFolderController {
  constructor(private readonly userFavoriteFolderService: UserFavoriteFolderService) {}

  @Put('toggle/:folderId')
  async toggleFavorite(@Param('folderId') folderId: string, @Req() req: any) {
    try {
      const user = req.user;
      const result = await this.userFavoriteFolderService.toggleFavorite(user.id, folderId);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to toggle favorite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('favorites')
  async getFavorites(@Req() req: any) {
    try {
      const user = req.user;
      const favorites = await this.userFavoriteFolderService.getFavoritesByProfile(user.id);
      return favorites;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('check/:folderId')
  async checkFavoriteStatus(@Param('folderId') folderId: string, @Req() req: any) {
    try {
      const user = req.user;
      const isFavorited = await this.userFavoriteFolderService.isFolderFavorited(user.id, folderId);
      return { isFavorited };
    } catch (error) {
      throw new HttpException(
        'Failed to check favorite status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
