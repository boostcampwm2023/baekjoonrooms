import { Injectable } from '@nestjs/common';
import { CreateClassifiedDto } from './dto/create-classified.dto';
import { UpdateClassifiedDto } from './dto/update-classified.dto';

@Injectable()
export class ClassifiedService {
  create(createClassifiedDto: CreateClassifiedDto) {
    return 'This action adds a new classified';
  }

  findAll() {
    return `This action returns all classified`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classified`;
  }

  update(id: number, updateClassifiedDto: UpdateClassifiedDto) {
    return `This action updates a #${id} classified`;
  }

  remove(id: number) {
    return `This action removes a #${id} classified`;
  }
}
