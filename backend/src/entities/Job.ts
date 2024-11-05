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

import { type Job as IJob, WorkSetup, WorkType } from '@shared/pack'
import { Tag } from './Tag'
import { Skill } from './Skill'
import { Shift } from './Shift'
import { Company } from './Company'
import { Application } from './Application'
import { JobToSkill } from './junctions/JobToSkill'
import { JobToTag } from './junctions/JobToTag'
import { JobToShift } from './junctions/JobToShift'
@Entity('jobs')
export class Job extends BaseEntity implements IJob<Skill, Company, Shift, Application, Tag> {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  salary_range: string

  @Column({
    nullable: true
  })
  posted_on: Date

  @Column({
    nullable: true
  })
  closing_date: Date

  @Column({
    type: 'enum',
    enum: [WorkSetup.REMOTE, WorkSetup.HYBRID, WorkSetup.ONSITE]
  })
  work_setup: WorkSetup

  @Column({
    type: 'enum',
    enum: [WorkType.FULLTIME, WorkType.PARTTIME, WorkType.INTERNSHIP]
  })
  work_type: WorkType

  @Column({
    default: false
  })
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

  @ManyToOne(() => Company, (company) => company.jobs)
  company: Company

  available_shifts: Shift[]

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

  @AfterLoad()
  populateProperties() {
    this.skills = this.job_skills.map((jobToSkill) => jobToSkill.skill)
    this.tags = this.job_tags.map((jobToTag) => jobToTag.tag)
    this.shifts = this.job_shifts.map((jobToShift) => jobToShift.shift)
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
