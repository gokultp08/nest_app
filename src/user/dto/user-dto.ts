import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  bio: string;

  @IsString()
  image: string;
}
