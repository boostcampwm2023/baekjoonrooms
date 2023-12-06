import { IsNotEmpty, IsString } from 'class-validator';

export class SubmissionDto {
  @IsString()
  @IsNotEmpty()
  submitURL!: string;

  @IsString()
  @IsNotEmpty()
  provider!: string;

  @IsString()
  @IsNotEmpty()
  providerId!: string;
}
