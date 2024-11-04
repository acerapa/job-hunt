import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Shift as ShiftTyping } from '@shared/pack'

@Entity('shifts')
export class Shift extends BaseEntity implements ShiftTyping {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  start_time: string

  @Column()
  end_time: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
