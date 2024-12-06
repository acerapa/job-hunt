import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  AfterLoad
} from 'typeorm'

import { type Job as IJob, JobStatus, WorkSetup, WorkType } from '@shared/pack'
import { Tag } from './Tag'
import { Skill } from './Skill'
import { Shift } from './Shift'
import { Company } from './Company'
import { Application } from './Application'
import { JobToSkill } from './junctions/JobToSkill'
import { JobToTag } from './junctions/JobToTag'
import { JobToShift } from './junctions/JobToShift'
import { Question } from './Question'

@Entity('jobs')
export class Job
  extends BaseEntity
  implements IJob<Skill, Company, Shift, Application, Tag, Question>
{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({
    type: 'json'
  })
  description: object

  @Column({
    nullable: true
  })
  salary_range: string

  @Column({
    nullable: true
  })
  posted_on: Date

  @Column({})
  status: JobStatus

  @Column({
    nullable: true
  })
  closing_date: Date

  @Column({
    type: 'json'
  })
  work_setup: WorkSetup[]

  @Column({
    type: 'json'
  })
  work_type: WorkType[]

  @Column({
    default: false
  })
  is_flex: boolean

  @Column({
    default: true
  })
  show_salary_range: boolean

  @Column({
    type: 'json'
  })
  responsibilities: object

  @Column()
  qualifications: string

  @Column()
  what_we_offer: string

  @Column({ nullable: true })
  application_url: string

  @Column({ nullable: true })
  others: string

  @ManyToOne(() => Company, (company) => company.jobs)
  company: Company

  @OneToMany(() => JobToSkill, (jobToSkill) => jobToSkill.job)
  job_skills: JobToSkill[]

  skills: Skill[]

  @OneToMany(() => JobToTag, (jobToTag) => jobToTag.job)
  job_tags: JobToTag[]

  tags: Tag[]

  @OneToMany(() => JobToShift, (jobToShift) => jobToShift.job)
  job_shifts: JobToShift[]

  shifts: Shift[]

  @OneToMany(() => Application, (application) => application.job)
  applications: Application[]

  @OneToMany(() => Question, (question) => question.job)
  questions: Question[]

  @AfterLoad()
  populateProperties() {
    this.skills = this.job_skills ? this.job_skills.map((jobToSkill) => jobToSkill.skill) : []
    this.tags = this.job_tags ? this.job_tags.map((jobToTag) => jobToTag.tag) : []
    this.shifts = this.job_shifts ? this.job_shifts.map((jobToShift) => jobToShift.shift) : []
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
