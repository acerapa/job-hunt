import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import { Address as IAddress } from '@shared/pack'

@Entity('addresses')
export class Address extends BaseEntity implements IAddress {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true
  })
  address1: string

  @Column({
    nullable: true
  })
  address2: string

  @Column({ nullable: true })
  city: string

  @Column()
  province: string

  @Column({ nullable: false })
  postal: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
