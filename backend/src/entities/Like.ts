import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Like as LikeTyping } from '@shared/pack'

@Entity('likes')
export class Like extends BaseEntity implements LikeTyping {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @Column()
  job_id: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
