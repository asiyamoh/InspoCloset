import { IsString, IsOptional, IsArray } from 'class-validator';

export class SubcategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
