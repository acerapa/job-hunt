import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Job } from '../Job'
import { Tag } from '../Tag'

@Entity('jobs_to_tags')
export class JobToTag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Job, (job) => job.job_tags)
  @JoinColumn({ name: 'job_id' })
  job: Job

  @ManyToOne(() => Tag, (tag) => tag.job_tags)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag
}
