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
import { Tag as ITag } from '@shared/pack'
import { Job } from './Job'
import { JobToTag } from './junctions/JobToTag'

@Entity('tags')
export class Tag extends BaseEntity implements ITag<Job> {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => JobToTag, (jobToTag) => jobToTag.job)
  job_tags: JobToTag[]

  jobs: Job[]

  @AfterLoad()
  populateProperties() {
    this.jobs = this.job_tags.map((jobToTag) => jobToTag.job)
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
