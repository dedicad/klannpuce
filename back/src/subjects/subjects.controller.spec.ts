import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

describe('SubjectsController', () => {
  let controller: SubjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectsController],
      providers: [
        {
          provide: getRepositoryToken(Subject),
          useClass: Repository,
        },
        SubjectsService,
      ],
    }).compile();

    controller = module.get<SubjectsController>(SubjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
