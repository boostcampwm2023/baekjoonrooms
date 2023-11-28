import { Test, TestingModule } from '@nestjs/testing';
import { ClassifiedService } from './classified.service';

describe('ClassifiedService', () => {
  let service: ClassifiedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassifiedService],
    }).compile();

    service = module.get<ClassifiedService>(ClassifiedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
