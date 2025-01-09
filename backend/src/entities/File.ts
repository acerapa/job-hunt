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
import { File as IFile } from '@shared/pack/dist'
import { Message } from './Message'

@Entity('files')
export class File extends BaseEntity implements IFile {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'mediumblob'
  })
  file: Buffer

  @Column()
  type: string

  @Column()
  name: string

  @Column()
  size: number

  @ManyToOne(() => Message)
  @JoinColumn({ name: 'message_id' })
  message: Message

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
