import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Task])],
  controllers: [SubjectsController],
  providers: [SubjectsService]
})
export class SubjectsModule {}
