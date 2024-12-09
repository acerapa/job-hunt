import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Conversation as IConversation } from '@shared/pack/dist'
import { User } from './User'
import { Message } from './Message'
import { UserToConversation } from './junctions/UserToConversation'

@Entity('conversations')
export class Conversation extends BaseEntity implements IConversation<User, Message> {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => UserToConversation, (userToConversation) => userToConversation.conversation)
  user_conversations: UserToConversation[]

  @Column({ default: false })
  is_pinned: boolean

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[]

  members: User[]

  @AfterLoad()
  async populateProperties() {
    this.members = this.user_conversations
      ? this.user_conversations.map((userToConversation) => userToConversation.user)
      : []
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
