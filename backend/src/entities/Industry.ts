import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Industry as IIndustry } from '@shared/pack/dist'
import { Company } from './Company'

@Entity('industries')
export class Industry extends BaseEntity implements IIndustry<Company> {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  @OneToMany(() => Company, (company) => company.industry)
  companies: Company[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
