import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Gender, UserType, User as UserTyping } from '@shared/pack'
import { Exclude } from 'class-transformer'

@Entity('users')
export class User extends BaseEntity implements UserTyping {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true
  })
  first_name: string

  @Column({
    nullable: true
  })
  last_name: string

  @Column({
    nullable: true
  })
  type: UserType

  @Column()
  gender: Gender

  @Column({
    unique: true,
    nullable: false
  })
  username: string

  @Column({
    nullable: false
  })
  @Exclude({ toPlainOnly: true })
  password: string

  @Column({
    nullable: false
  })
  email: string

  @Column({
    nullable: true
  })
  phone: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
