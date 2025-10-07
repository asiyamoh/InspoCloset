import { IsString, IsUUID } from 'class-validator';

export class CreateUserFavoriteFolderDto {
  @IsString()
  @IsUUID()
  profileId: string;

  @IsString()
  @IsUUID()
  folderId: string;
}
