import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Profile } from '../Profile'
import { Skill } from '../Skill'

@Entity('profiles_to_skills')
export class ProfileToSkill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Profile, (profile) => profile.profile_skills)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile

  @ManyToOne(() => Skill, (skill) => skill.profile_skills)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill
}
