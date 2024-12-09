import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../User'
import { Conversation } from '../Conversation'

@Entity('user_to_conversation')
export class UserToConversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.user_conversations)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Conversation, (conversation) => conversation.user_conversations)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation
}
