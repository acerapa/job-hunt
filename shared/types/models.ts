import { Gender, UserType, WorkSetup, WorkType } from '.'
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
  address?: Address
  address_id: number
  skills?: Skill[]
}

export interface Skill {
  id?: number
  name: string
  type: SkillType
}

export interface Company {
  id: number
  name: string
  user_id: number
  description: string
  employee_range: string
  website: string
  logo: string
  address?: Address
  address_id: number
  jobs?: Job[]
  industry: string
  created_at: Date
  updated_at: Date
}

export interface Job {
  id: number
  company_id: number
  title: string
  description: string
  salary_range: string
  posted_on: Date
  closing_date: Date
  work_setup: WorkSetup
  work_type: WorkType
  available_shifts: Shift[]
  is_flex: boolean
  skills?: Skill[]
  applications?: Application[]
  responsibilities: string
  qualifications: string
  what_we_offer: string
  application_url: string
  others: string
  tags?: Tag[]
  created_at?: Date
  updated_at?: Date
}

export interface Address {
  id: number
  address1: string
  address2: string
  city: string
  province: string
  postal: string
}

export interface Shift {
  id: number
  name: string
  start_time: string
  end_time: string
  created_at?: Date
  updated_at?: Date
}

export interface Application {
  id: number
  user_id: number
  job_id: number
  created_at?: Date
  updated_at?: Date
}

export interface Tag {
  id: number
  name: string
  created_at: Date
  updated_at: Date
}

export interface Like {
  id: number
  user_id: number
  job_id: number
  created_at: Date
  updated_at: Date
}
