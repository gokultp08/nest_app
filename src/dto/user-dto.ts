import { IsNotEmpty, IsString } from 'class-validator';

export class User {
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
  additionalDetail: string;
  image: string;
}
