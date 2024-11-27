import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Application } from '../Application'
import { Answer } from '../Answer'

@Entity('application_to_answer')
export class ApplicationToAnswer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Application, (application) => application.application_answers)
  @JoinColumn({ name: 'application_id' })
  application: Application

  @ManyToOne(() => Answer, (answer) => answer.application_answers)
  @JoinColumn({ name: 'answer_id' })
  answer: Answer
}
