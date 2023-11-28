import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClassifiedService } from './classified.service';
import { CreateClassifiedDto } from './dto/create-classified.dto';
import { UpdateClassifiedDto } from './dto/update-classified.dto';
import { SessionAuthGuard } from '../auth/auth.guard';

@Controller('classified')
export class ClassifiedController {
  constructor(private readonly classifiedService: ClassifiedService) {}

  @Post()
  create(@Body() createClassifiedDto: CreateClassifiedDto) {
    return this.classifiedService.create(createClassifiedDto);
  }

  @Get()
  @UseGuards(SessionAuthGuard)
  findAll(@Req() req: Express.Request) {
    console.log('classified?');
    return 'you are accessing classified info!';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classifiedService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassifiedDto: UpdateClassifiedDto,
  ) {
    return this.classifiedService.update(+id, updateClassifiedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classifiedService.remove(+id);
  }
}
