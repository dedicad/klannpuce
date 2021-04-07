import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

describe('SubjectsService', () => {
  let service: SubjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Subject),
          useClass: Repository,
        },
        SubjectsService,
      ],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
