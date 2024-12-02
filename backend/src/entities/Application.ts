import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ApplicationStatus, Application as IApplication } from '@shared/pack'
import { Job } from './Job'
import { Profile } from './Profile'
import { Answer } from './Answer'

@Entity('applications')
export class Application extends BaseEntity implements IApplication<Job, Profile, Answer> {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: [
      ApplicationStatus.UNREVIEWED,
      ApplicationStatus.DECLINED,
      ApplicationStatus.INTERVIEWING,
      ApplicationStatus.OFFERED,
      ApplicationStatus.REVIEWED
    ]
  })
  status: ApplicationStatus

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile

  @ManyToOne(() => Job, (job) => job.applications)
  @JoinColumn({ name: 'job_id' })
  job: Job

  @OneToMany(() => Answer, (answer) => answer.application)
  answers: Answer[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
