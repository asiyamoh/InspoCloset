import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum SearchType {
  TAGS = 'tags',
  FOLDERS = 'folders',
  CATEGORIES = 'categories',
  ALL = 'all',
}

export class SearchRequestDto {
  @IsString()
  q: string;

  @IsOptional()
  @IsEnum(SearchType)
  type?: SearchType = SearchType.TAGS;

  @IsOptional()
  limit?: number = 10;
}
