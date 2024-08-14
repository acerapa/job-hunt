import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CompanyRep } from "./CompanyRep";
import { Company } from "./Company";

@Entity("jobs")
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  posted_on: Date;

  @Column()
  closing_date: Date;

  @Column()
  application_url: string;

  @Column()
  location: string;

  @Column()
  openings: number;

  @ManyToOne(() => CompanyRep, (companyRep) => companyRep.jobs)
  @JoinColumn({ name: "posted_by" })
  rep: CompanyRep;

  @ManyToOne(() => Company, (company) => company.jobs)
  @JoinColumn({ name: "company_id" })
  company: Company;
}
