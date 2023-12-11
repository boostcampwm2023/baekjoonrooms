import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RoomSubmissionDto {
  @ApiProperty({
    example: '16A760',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  roomCode!: string;
}
