import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Message as IMessage } from '@shared/pack/dist'
import { Conversation } from './Conversation'
import { User } from './User'

@Entity('messages')
export class Message extends BaseEntity implements IMessage<Conversation, User> {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User

  @Column()
  message: string

  @Column({
    default: false
  })
  is_seen: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
