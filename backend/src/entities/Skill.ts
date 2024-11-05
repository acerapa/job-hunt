import { type Skill as ISkill, SkillType } from '@shared/pack'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterLoad
} from 'typeorm'
import { ProfileToSkill } from './junctions/ProfileToSkill'
import { Profile } from './Profile'
import { JobToSkill } from './junctions/JobToSkill'
import { Job } from './Job'

@Entity('skills')
export class Skill extends BaseEntity implements ISkill<Profile> {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false
  })
  name: string

  @Column({
    nullable: false
  })
  type: SkillType

  @OneToMany(() => ProfileToSkill, (profileToSkill) => profileToSkill.skill)
  profile_skills: ProfileToSkill[]

  @OneToMany(() => JobToSkill, (jobToSkill) => jobToSkill.skill)
  job_skills: JobToSkill[]

  profiles: Profile[]

  jobs: Job[]

  @AfterLoad()
  populateProperties() {
    this.profiles = this.profile_skills.map((profileToSkill) => profileToSkill.profile)
    this.jobs = this.job_skills.map((jobToSkill) => jobToSkill.job)
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
