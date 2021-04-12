import { Test, TestingModule } from '@nestjs/testing';
import { AdvancementsController } from './advancements.controller';
import { AdvancementsService } from './advancements.service';

describe('AdvancementsController', () => {
  let controller: AdvancementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvancementsController],
      providers: [AdvancementsService],
    }).compile();

    controller = module.get<AdvancementsController>(AdvancementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
