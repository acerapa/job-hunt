import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Shift as IShift } from '@shared/pack'
import { JobToShift } from './junctions/JobToShift'
import { Job } from './Job'

@Entity('shifts')
export class Shift extends BaseEntity implements IShift<Job> {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  start_time: string

  @Column({ nullable: true })
  end_time: string

  @Column({ default: false })
  is_default: boolean

  @OneToMany(() => JobToShift, (jobToShift) => jobToShift.shift)
  job_shifts: JobToShift[]

  jobs: Job[]

  @AfterLoad()
  populateProperties() {
    this.jobs = this.job_shifts.map((jobToShift) => jobToShift.job)
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
