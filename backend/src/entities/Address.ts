import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('addresses')
export class Address extends BaseEntity {
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

  @Column({nullable: true})
  city: string

  @Column({nullable: true})
  postal: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
