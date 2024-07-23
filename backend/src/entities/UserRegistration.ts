import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { User } from './User'

@Entity('user-registrations')
export class UserRegistration extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    default: false
  })
  done_type: boolean

  @Column({
    default: false
  })
  is_completed: boolean

  @Column()
  user_id: number

  @OneToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user: User;
  
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
