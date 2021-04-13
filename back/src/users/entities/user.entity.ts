import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export type Role = 'student' | 'teacher' | 'admin';

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
  role: Role;

  /**
   * DB insert time.
   */
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
