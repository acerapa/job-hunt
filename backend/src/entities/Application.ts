import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Application as ApplicationTyping } from '@shared/pack'

@Entity('applications')
export class Application extends BaseEntity implements ApplicationTyping {
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
