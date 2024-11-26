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
import { CompanyType, type Company as ICompany } from '@shared/pack'
import { Job } from './Job'
import { User } from './User'
import { Address } from './Address'
import { Industry } from './Industry'

@Entity('companies')
export class Company extends BaseEntity implements ICompany<User, Job> {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User, (user) => user.company)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({
    nullable: true
  })
  logo: string

  @Column({ nullable: true })
  website: string

  @ManyToOne(() => Industry, (industry) => industry.companies)
  @JoinColumn({ name: 'industry_id' })
  industry: Industry

  @Column({
    comment: 'Refers to the name of the comany'
  })
  name: string

  @Column({
    type: 'enum',
    nullable: true,
    enum: [CompanyType.STARTUP, CompanyType.CORPORATION, CompanyType.NON_PROFIT]
  })
  type: CompanyType

  @Column({
    comment: 'Company descriptions'
  })
  description: string

  @Column({ nullable: true })
  employee_range: string

  @Column({ nullable: true })
  ratings: number

  @ManyToOne(() => Address)
  address: Address

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
