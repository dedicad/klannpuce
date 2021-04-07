import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 60, unique: true })
  name: string;

  @Column('varchar', { length: 500 })
  description: string;

  @OneToMany((type) => Task, (task) => task.subject, {
    cascade: ['insert'],
    eager: true,
  })
  tasks: Task[];

  /**
   * DB insert time.
   */
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
