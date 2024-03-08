import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class RoomCodePipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    const hexRegExp = /^[0-9a-fA-F]{6}$/;

    if (!hexRegExp.test(value)) {
      throw new BadRequestException('Invalid room code');
    }

    return value;
  }
}
