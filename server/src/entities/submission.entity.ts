import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Submission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  language: string;

  @Column({ type: 'text' })
  code: string;

  @CreateDateColumn({ type: 'timestamp' })
  submittedAt: Date;
}
