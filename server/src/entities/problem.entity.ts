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

  @Column()
  level: number;
}
