import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  iconPicture?: string;

  @IsOptional()
  @IsString()
  folderId?: string;

  @IsOptional()
  @IsString()
  brideId?: string;

  @IsOptional()
  @IsString()
  profileId?: string;
}

export interface CategoryData {
  name: string;
  icon?: Express.Multer.File;
  pictures: {
    file: Express.Multer.File;
    tags: string[];
  }[];
}
