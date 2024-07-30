import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { User } from "./User";
import { Company } from "./Company";
import { Job } from "./Job";

@Entity("company_reps")
export class CompanyRep extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @OneToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @ManyToOne(() => Company, (company) => company.rep)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @OneToMany(() => Job, (job) => job.rep)
  jobs: Job[];
}
