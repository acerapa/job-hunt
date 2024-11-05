import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Job } from '../Job'
import { Skill } from '../Skill'

@Entity('jobs_to_skills')
export class JobToSkill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Job, (job) => job.job_skills)
  @JoinColumn({ name: 'job_id' })
  job: Job

  @ManyToOne(() => Skill, (skill) => skill.job_skills)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill
}
