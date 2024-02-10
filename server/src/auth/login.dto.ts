import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'mockuser',
    required: true,
  })
  @IsString()
  username!: string;

  @ApiProperty({
    example: 'mockuser',
    required: true,
  })
  @IsString()
  password!: string;
}
