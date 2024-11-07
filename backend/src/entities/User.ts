import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  AfterLoad
} from 'typeorm'
import { Gender, UserType, User as IUser } from '@shared/pack'
import { Profile } from './Profile'
import { Company } from './Company'

@Entity('users')
export class User extends BaseEntity implements IUser<Profile, Company> {
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

  @Column({
    nullable: true
  })
  gender: Gender

  @Column({
    unique: true,
    nullable: false
  })
  username: string

  @Column()
  password: string

  @Column({
    nullable: false,
    unique: true
  })
  email: string

  @Column({
    nullable: true
  })
  phone: string

  private passwordClone: string
  @AfterLoad()
  hidePassword() {
    this.passwordClone = this.password
    this.password = ''
  }

  getPassword() {
    return this.passwordClone
  }

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: ['remove'] })
  profile: Profile

  @OneToOne(() => Company, (company) => company.user, { cascade: ['remove'] })
  company: Company

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
