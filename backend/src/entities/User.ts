import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { CompanyRep } from "./CompanyRep";
import { UserRegistration } from "./UserRegistration";
import { UserType } from "@shared/pack";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  first_name: string;

  @Column({
    nullable: true
  })
  last_name: string;
  @Column({
    nullable: true
  })
  type: UserType

  @Column({
    unique: true,
    nullable: false
  })
  username: string;

  @Column({
    nullable: false,
    select: false
  })
  password: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: true,
  })
  mobile_number: string;

  @Column({nullable: true})
  professional_summary: string

  @OneToOne(() => CompanyRep, (comanyRep) => comanyRep.user)
  company_rep: CompanyRep;

  @OneToOne(() => UserRegistration, (userRegistration) => userRegistration.user)
  user_registration: UserRegistration

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
