import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvancementsService } from 'src/advancements/advancements.service';
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
    private readonly advancementsService: AdvancementsService,
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


  async exists(name: string): Promise<boolean> {
    return (await this.subjectRepository.count({ where: { name: name } })) > 0;
  }

  async findAll(user: User): Promise<Subject[]> {
    const subjects = await this.subjectRepository.find({
      relations: ['tasks'],
      select: ['name', 'description', 'author', 'id'],
    });
    // Not optimal but I had trouble realizing it fully with TypeOrm
    const advancements = (await this.advancementsService.findAll(user)).map(
      (advancement) => advancement.id,
    );

    return subjects.map((subject) => {
      return {
        ...subject,
        tasks: subject.tasks.map((task) => {
          return {
            ...task,
            advancements: task.advancements.filter((advancement) =>
              advancements.includes(advancement.id),
            ),
          };
        }),
      };
    });
  }

  async findOne(_id: number) {
    return await this.subjectRepository.find({
      relations: ['tasks'],
      select: ['name', 'description', 'author', 'id'],
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
