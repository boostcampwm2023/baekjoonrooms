import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Problem from './problem.entity';

@Entity()
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 이 태그가 붙은 문제들
  @ManyToMany(() => Problem, (problem) => problem.tags)
  problems: Problem[];
}
