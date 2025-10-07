import { IsString, IsOptional } from 'class-validator';

export class UpdateSubcategoryDto {
  @IsString()
  @IsOptional()
  name?: string;
}
