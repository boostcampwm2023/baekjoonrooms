import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserByProviderDto {
  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  providerId: string;
}
