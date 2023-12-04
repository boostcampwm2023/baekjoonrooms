import { Transform } from 'class-transformer';
import { ArrayUnique, IsNotEmpty, IsNumber } from 'class-validator';

export class RandomProblemDto {
  @Transform(({ value }) => value.split(',').map((v: string) => +v))
  @ArrayUnique()
  @IsNumber({}, { each: true })
  tagIds: number[];

  @Transform(({ value }) => value.split(',').map((v: string) => +v))
  @ArrayUnique()
  @IsNumber({}, { each: true })
  levels: number[];

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
