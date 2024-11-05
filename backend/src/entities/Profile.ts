import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { type Profile as IProfile } from '@shared/pack'
import { User } from './User'
import { ProfileToSkill } from './junctions/ProfileToSkill'
import { Address } from './Address'
import { Skill } from './Skill'
import { Application } from './Application'

@Entity('profiles')
export class Profile extends BaseEntity implements IProfile<User, Skill, Application> {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true
  })
  cover_letter: string

  @Column({
    nullable: true
  })
  resume: string

  @Column({
    nullable: true
  })
  profile_pic: string

  @Column({
    nullable: true
  })
  expected_salary_range: string

  @Column({
    nullable: true
  })
  website: string

  @Column({
    nullable: true
  })
  linkedin: string

  @Column({
    nullable: true
  })
  github: string

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => ProfileToSkill, (profileToSkill) => profileToSkill.profile)
  profile_skills: ProfileToSkill[]

  skills: Skill[]

  @OneToMany(() => Application, (application) => application.job)
  applications: Application[]

  @AfterLoad()
  populateSkills() {
    this.skills = this.profile_skills.map((profileToSkill) => {
      return profileToSkill.skill
    })
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
