import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayUnique, IsNotEmpty, IsNumber, Min } from 'class-validator';

/**
 * TODO: class-validation을 사용해 검증 필요
 */
export class RandomProblemDto {
  @ApiProperty({
    example: '1,2,3,4,5',
    required: true,
    minLength: 1,
  })
  @Transform(({ value }) => value.split(',').map((v: string) => +v))
  @ArrayUnique()
  @IsNumber({}, { each: true })
  tagIds!: number[];

  @ApiProperty({
    example: '0,1,2,3,4',
    required: true,
    minLength: 1,
  })
  @Transform(({ value }) => value.split(',').map((v: string) => +v))
  @ArrayUnique()
  @IsNumber({}, { each: true })
  levels!: number[];

  @ApiProperty({
    example: '5',
    required: true,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  count!: number;
}
