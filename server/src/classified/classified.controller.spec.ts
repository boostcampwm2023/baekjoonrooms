import { Test, TestingModule } from '@nestjs/testing';
import { ClassifiedController } from './classified.controller';
import { ClassifiedService } from './classified.service';

describe('ClassifiedController', () => {
  let controller: ClassifiedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassifiedController],
      providers: [ClassifiedService],
    }).compile();

    controller = module.get<ClassifiedController>(ClassifiedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
