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
  JoinColumn,
} from "typeorm";
import { CompanyRep } from "./CompanyRep";
import { Job } from "./Job";
import { Address } from "./Address";

@Entity("companies")
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "Refers to the name of the comany",
  })
  name: string;

  @Column({
    comment: "Company descriptions",
  })
  description: string;

  @Column()
  employee_range: string;

  @Column()
  site_url: string;

  @Column()
  address_id: number;

  @OneToOne(() => CompanyRep, (companyRep) => companyRep.company)
  rep: CompanyRep;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];

  @ManyToMany(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
