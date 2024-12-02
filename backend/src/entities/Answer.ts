import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { type Answer as IAnswers } from '@shared/pack/dist'
import { Question } from './Question'
import { Application } from './Application'

@Entity('answers')
export class Answer extends BaseEntity implements IAnswers<Question, Application> {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  answer: string

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
  question: Question

  @ManyToOne(() => Application)
  @JoinColumn({ name: 'application_id' })
  application: Application

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
