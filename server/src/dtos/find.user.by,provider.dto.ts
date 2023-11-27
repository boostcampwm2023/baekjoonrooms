import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindUserByProviderDto {
  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsNumber()
  @IsNotEmpty()
  providerId: number;
}
