import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateBrideDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
