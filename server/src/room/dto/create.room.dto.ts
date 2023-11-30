import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
