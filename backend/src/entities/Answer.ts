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
import { ApplicationToAnswer } from './junctions/ApplicationToAnswer'

@Entity('answers')
export class Answer extends BaseEntity implements IAnswers<Question> {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  answer: string

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
  question: Question

  @OneToMany(() => ApplicationToAnswer, (applicationToAnswer) => applicationToAnswer.answer)
  application_answers: ApplicationToAnswer[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
