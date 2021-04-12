import { Test, TestingModule } from '@nestjs/testing';
import { AdvancementsService } from './advancements.service';

describe('AdvancementsService', () => {
  let service: AdvancementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvancementsService],
    }).compile();

    service = module.get<AdvancementsService>(AdvancementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
