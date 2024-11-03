import { Gender, UserType } from '.'
import { SkillType } from '.'

export interface User {
  id?: number
  phone: string
  email: string
  type: UserType
  gender: Gender
  username: string
  password: string
  created_at: Date
  updated_at: Date
  profile?: object
  last_name: string
  first_name: string
}

export interface Profile {
  id?: number
  user?: User
  user_id: number
  cover_letter: string
  resume: string
  profile_pic: string
  expected_salary_range: string
  website: string
  linkedin: string
  github: string
  address: Address
}

export interface Skill {
  id?: number
  name: string
  type: SkillType
}

export interface CompanyRep {
  id: number
  position: string
  jobs?: Job[]
  user?: User
  company: Company
  user_id?: number
  company_id?: number
}

export interface Company {
  id: number
  name: string
  description: string
  employee_range: string
  site_url: string
  rep: CompanyRep
  jobs: Job[]
  created_at: Date
  updated_at: Date
}

export interface Job {
  id: number
  title: string
  description: string
  posted_on: Date
  closing_date: Date
  application_url: string
  location: string
  posted_by?: number
  rep: CompanyRep
  company_id?: number
  company: Company
}

export interface Address {
  id: number
  address1: string
  address2: string
  city: string
  province: string
  postal: string
}
