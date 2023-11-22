import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Problem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bojProblemId: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ comment: 'solved.ac의 난이도, 정수로 표현됨' })
  level: number;
}
