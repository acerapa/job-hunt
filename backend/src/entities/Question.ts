import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { type Question as IQuestion } from '@shared/pack/dist'
import { Job } from './Job'

@Entity('questions')
export class Question extends BaseEntity implements IQuestion<Job> {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  question: string

  @Column()
  is_required: boolean

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
