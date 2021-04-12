import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvancementsService } from './advancements.service';
import { Advancement } from './entities/advancement.entity';

describe('AdvancementsService', () => {
  let service: AdvancementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdvancementsService,
        {
          provide: getRepositoryToken(Advancement),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdvancementsService>(AdvancementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
