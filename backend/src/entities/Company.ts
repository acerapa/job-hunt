import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm'
import { type Company as ICompany } from '@shared/pack'
import { Job } from './Job'
import { User } from './User'
import { Address } from './Address'

@Entity('companies')
export class Company extends BaseEntity implements ICompany<User, Job> {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User, (user) => user.company)
  @JoinColumn({ name: 'user_id' })
  user: User

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

  @ManyToOne(() => Address)
  address: Address

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
