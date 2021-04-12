import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Advancement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('int')
  taskId: number;

  /**
   * DB insert time.
   */
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
