import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { type Profile as ProfileTyping } from '@shared/pack'

export class Profile extends BaseEntity implements ProfileTyping {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

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

  @Column({
    nullable: true
  })
  address_id: number
}
