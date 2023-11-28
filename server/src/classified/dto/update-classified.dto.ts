import { PartialType } from '@nestjs/swagger';
import { CreateClassifiedDto } from './create-classified.dto';

export class UpdateClassifiedDto extends PartialType(CreateClassifiedDto) {}
