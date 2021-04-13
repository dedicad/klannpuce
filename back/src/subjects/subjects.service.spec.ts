import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdvancementsModule } from 'src/advancements/advancements.module';
import { AdvancementsService } from 'src/advancements/advancements.service';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { Task } from './entities/task.entity';
import { SubjectsService } from './subjects.service';

describe('SubjectsService', () => {
  let service: SubjectsService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     {
    //       provide: getRepositoryToken(Subject),
    //       useClass: Repository,
    //     },
    //     {
    //       provide: getRepositoryToken(Task),
    //       useClass: Repository,
    //     },
    //     SubjectsService,
    //   ],
    //   imports: [AdvancementsModule],
    // }).compile();
    // service = module.get<SubjectsService>(SubjectsService);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
