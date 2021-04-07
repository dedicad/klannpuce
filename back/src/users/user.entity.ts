import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

declare type role = 'student' | 'teacher';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 60, unique: true })
  name: string;

  @Column('varchar', { length: 60, unique: true })
  email: string;

  @Column('varchar', { length: 60, nullable: true })
  passwordHash: string;

  @Column({ length: 10, default: 'student' })
  role: role;

  /**
   * DB insert time.
   */
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
