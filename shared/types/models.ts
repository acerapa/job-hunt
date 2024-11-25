import { ApplicationStatus, CompanyType, Gender, JobStatus, UserType, WorkSetup, WorkType } from '.'
import { SkillType } from '.'

export interface User<Profile = Object, Company = Object> {
  id: number
  phone: string
  email: string
  type: UserType
  gender: Gender
  username: string
  password?: string
  created_at: Date
  updated_at: Date
  profile?: Profile
  company?: Company
  last_name: string
  first_name: string
}

export interface Profile<User = Object, Skill = Object, Application = Object> {
  id: number
  user: User
  user_id?: number
  cover_letter: string
  resume: string
  profile_pic: string
  expected_salary_range: string
  applications: Application[]
  website: string
  linkedin: string
  github: string
  address?: Address
  address_id?: number
  skills?: Skill[]
}

export interface Skill<Profile = Object> {
  id: number
  name: string
  type: SkillType
  profiles?: Profile[]
}

export interface Company<User = Object, Job = Object> {
  id: number
  name: string
  user_id?: number
  user: User
  description: string
  employee_range: string
  website: string
  logo: string
  type: CompanyType
  address?: Address
  address_id?: number
  jobs?: Job[]
  ratings: number
  industry: Industry
  created_at: Date
  updated_at: Date
}

export interface Job<
  Skill = Object,
  Company = Object,
  Shift = Object,
  Application = Object,
  Tag = Object
> {
  id: number
  company_id?: number
  title: string
  description: string
  salary_range: string
  show_salary_range: boolean
  posted_on: Date
  status: JobStatus
  closing_date: Date
  work_setup: WorkSetup[]
  work_type: WorkType[]
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
  company: Company
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
  country: string
}

export interface Shift<Job = Object> {
  id: number
  name: string
  start_time: string
  jobs: Job[]
  end_time: string
  created_at?: Date
  updated_at?: Date
}

export interface Application<Job = Object, Profile = Object> {
  id: number
  profile_id?: number
  profile: Profile
  job_id?: number
  job: Job
  status: ApplicationStatus
  created_at?: Date
  updated_at?: Date
}

export interface Tag<Job = Object> {
  id: number
  name: string
  jobs: Job[]
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

export interface Industry<Company = Object> {
  id: number
  name: string
  companies?: Company[]
  created_at: Date
  updated_at: Date
}
