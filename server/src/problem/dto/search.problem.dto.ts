import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchProblemDto {
  @ApiProperty({
    example: 'A+B',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  searchKeyword?: string;
}
