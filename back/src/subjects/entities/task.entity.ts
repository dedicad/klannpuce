import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Subject } from './subject.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 60 })
  name: string;

  @Column('varchar', { length: 500 })
  description: string;

  @ManyToOne((type) => Subject, (subject) => subject.tasks, {
    cascade: ['insert'],
  })
  @JoinColumn()
  subject: Subject;

  /**
   * DB insert time.
   */
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
