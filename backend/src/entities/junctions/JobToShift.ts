import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Job } from '../Job'
import { Shift } from '../Shift'

@Entity('jobs_to_shifts')
export class JobToShift extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Job, (job) => job.job_shifts)
  @JoinColumn({ name: 'job_id' })
  job: Job

  @ManyToOne(() => Shift, (shift) => shift.job_shifts)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift
}
