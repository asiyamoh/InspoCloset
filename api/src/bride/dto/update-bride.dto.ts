import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateBrideDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
