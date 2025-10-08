import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  brideId?: string;

  @IsOptional()
  @IsString()
  iconPicture?: string;

  @IsOptional()
  @IsBoolean()
  hasSubcategories?: boolean;

  @IsOptional()
  @IsString()
  profileId?: string;
}
