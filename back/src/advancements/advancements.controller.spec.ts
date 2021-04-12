import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvancementsController } from './advancements.controller';
import { AdvancementsService } from './advancements.service';
import { Advancement } from './entities/advancement.entity';

describe('AdvancementsController', () => {
  let controller: AdvancementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvancementsController],
      providers: [
        AdvancementsService,
        {
          provide: getRepositoryToken(Advancement),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AdvancementsController>(AdvancementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
