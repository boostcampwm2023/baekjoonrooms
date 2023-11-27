import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsNumber()
  @IsNotEmpty()
  providerId: number;

  @IsString()
  @IsOptional()
  avatarUrl: string;
}
