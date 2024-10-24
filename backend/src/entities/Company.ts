import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { CompanyRep } from "./CompanyRep";
import { Job } from "./Job";

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
  employee_population_range: string;

  @Column()
  site_url: string;

  @OneToMany(() => CompanyRep, (companyRep) => companyRep.company)
  reps: CompanyRep[];

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
