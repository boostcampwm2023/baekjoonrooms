import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Submission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ comment: '제출한 코드의 프로그래밍 언어' })
  language: string;

  @Column({ type: 'text', comment: '제출한 코드' })
  code: string;

  @CreateDateColumn({ type: 'timestamp' })
  submittedAt: Date;
}
