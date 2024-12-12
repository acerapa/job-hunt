import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  BeforeInsert,
  OneToMany,
  AfterLoad
} from 'typeorm'
import { Gender, UserType, User as IUser } from '@shared/pack'
import { Profile } from './Profile'
import { Company } from './Company'
import { hash } from 'bcryptjs'
import { Exclude } from 'class-transformer'
import { Conversation } from './Conversation'
import { UserToConversation } from './junctions/UserToConversation'

@Entity('users')
export class User extends BaseEntity implements IUser<Profile, Company, Conversation> {
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
    default: false,
    nullable: true
  })
  is_active: boolean

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
  @Exclude({ toClassOnly: true })
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

  conversations: Conversation[]
  fullName: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10)
  }

  @OneToMany(() => UserToConversation, (userToConversation) => userToConversation.user)
  user_conversations: UserToConversation[]

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: ['remove'] })
  profile: Profile

  @OneToOne(() => Company, (company) => company.user, { cascade: ['remove'] })
  company: Company

  @AfterLoad()
  async populateProperties() {
    this.conversations = this.user_conversations
      ? this.user_conversations.map((userToConversation) => userToConversation.conversation)
      : []

    this.fullName = `${this.first_name} ${this.last_name}`
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
