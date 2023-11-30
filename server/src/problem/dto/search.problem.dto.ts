import { IsNotEmpty, IsString } from 'class-validator';

export class SearchProblemDto {
  @IsString()
  @IsNotEmpty()
  searchKeyword: string;
}
