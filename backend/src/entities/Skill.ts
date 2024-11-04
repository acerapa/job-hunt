import { type Skill as SkillTyping, SkillType } from '@shared/pack'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('skills')
export class Skill extends BaseEntity implements SkillTyping {
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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
