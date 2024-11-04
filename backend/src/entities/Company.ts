import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  JoinColumn
} from 'typeorm'
import { User } from './User'
import { Address, Job, type Company as CompanyTyping } from '@shared/pack'

@Entity('companies')
export class Company extends BaseEntity implements CompanyTyping {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: 'Refers to the user id of the company'
  })
  @OneToOne(() => User, (user) => user)
  user_id: number

  @Column()
  logo: string

  @Column({ nullable: true })
  website: string

  @Column()
  industry: string

  @Column({
    comment: 'Refers to the name of the comany'
  })
  name: string

  @Column({
    comment: 'Company descriptions'
  })
  description: string

  @Column()
  employee_range: string

  @Column()
  site_url: string

  @Column()
  address_id: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
