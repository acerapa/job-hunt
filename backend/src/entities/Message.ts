import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Message as IMessage } from '@shared/pack/dist'
import { Conversation } from './Conversation'

@Entity('messages')
export class Message extends BaseEntity implements IMessage {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation

  sender_id: number
  message: string
  is_seen: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
