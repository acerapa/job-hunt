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
import { Shift } from './Shift'

@Entity('companies')
export class Company extends BaseEntity implements ICompany<User, Job, Shift> {
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
    type: 'text',
    comment: 'Company descriptions'
  })
  description: string

  @Column({ nullable: true })
  employee_range: string

  @Column({ type: 'text', nullable: true })
  mission: string

  @Column({ type: 'text', nullable: true })
  vision: string

  @Column({ nullable: true })
  ratings: number

  @ManyToOne(() => Address)
  address: Address

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[]

  @OneToMany(() => Shift, (shift) => shift.company)
  shifts: Shift[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
