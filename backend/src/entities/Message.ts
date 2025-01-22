import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Message as IMessage } from '@shared/pack/dist'
import { Conversation } from './Conversation'
import { User } from './User'
import { File } from './File'

@Entity('messages')
export class Message extends BaseEntity implements IMessage<Conversation, User, File> {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User

  @Column({
    type: 'text',
    nullable: true
  })
  message: string

  @Column({
    default: false
  })
  is_seen: boolean

  @OneToMany(() => File, (file) => file.message)
  files: File[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
