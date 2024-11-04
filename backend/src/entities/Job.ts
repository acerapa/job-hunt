import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import type { Job as JobTyping, WorkSetup, WorkType, Shift, Application, Tag } from '@shared/pack'
@Entity('jobs')
export class Job extends BaseEntity implements JobTyping {
  available_shifts: Shift[]
  applications?: Application[] | undefined
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  company_id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  salary_range: string

  @Column()
  posted_on: Date

  @Column()
  closing_date: Date

  @Column()
  work_setup: WorkSetup

  @Column()
  work_type: WorkType

  @Column()
  is_flex: boolean

  @Column()
  responsibilities: string

  @Column()
  qualifications: string

  @Column()
  what_we_offer: string

  @Column()
  application_url: string

  @Column()
  others: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
