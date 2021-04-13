import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
  ) {}
  create(createSubjectDto: CreateSubjectDto, user: User): Promise<Subject> {
    const subject = new Subject();
    subject.name = createSubjectDto.name;
    subject.description = createSubjectDto.description;
    subject.author = user.name;


    subject.tasks = createSubjectDto.tasks.map((createTaskDto) => {
      const task = new Task();
      task.name = createTaskDto.name;
      task.description = createTaskDto.description;
      task.level = createTaskDto.level;
      return task;
    });
    
    return this.subjectRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.find({
      relations: ['tasks'],
      select: ['name', 'description', 'author'],
    });
  }

  async findOne(_id: number) {
    return await this.subjectRepository.find({
      relations: ['tasks'],
      select: ['name', 'description', 'author'],
      where: [{ id: _id }],
    });
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
