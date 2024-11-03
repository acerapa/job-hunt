import { Address, Company, CompanyRep, User } from "./models";

export type UserCreation = {
  email: string;
  username: string;
  password: string;
};

export type UserInfoCreation = {
  first_name: string;
  last_name: string;
  mobile_number: string;
  professional_summary: string;
  email?: string;
};

export type UserUpdate = {
  id: number;
  user: Partial<User>;
  address: Partial<Address>;
};

export type CompanyCreation = {
  company: Partial<Company>;
  rep: Partial<CompanyRep>;
  address: Partial<Address>;
};
