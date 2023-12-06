import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubmissionDto {
  @ApiProperty({
    example: '/status?user_id=ccp0209&problem_id=1001&from_mine=1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  submitURL!: string;

  @ApiProperty({
    example: 'github',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  provider!: string;

  @ApiProperty({
    example: '12341234',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  providerId!: string;
}
