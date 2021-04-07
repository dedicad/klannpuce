import { CreateTaskDto } from './create-task.dto';

export class CreateSubjectDto {
  name: string;
  description: string;
  tasks: CreateTaskDto[];
}
