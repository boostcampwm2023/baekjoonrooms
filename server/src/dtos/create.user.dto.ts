import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'sjn0910',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'github',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  provider: string;

  @ApiProperty({
    example: '12341234',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  providerId: string;

  @ApiProperty({
    example: 'https://avatars.githubusercontent.com/u/71765155?v=4',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatarUrl: string;
}
