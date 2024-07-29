import { UserType } from "."

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  type: UserType
  mobile_number: string
  professional_summary: string
  company_rep: CompanyRep | null
  user_registration: UserRegistration
  created_at: Date
  updated_at: Date
}

export interface CompanyRep {
  id: number
  position: string
  jobs: Job[]
  user: User
  company: Company
  user_id?: number
  company_id?: number
}

export interface UserRegistration {
  id: number
  done_type: boolean
  is_completed: boolean
  user: User
  user_id?: number
  created_at: Date
  updated_at: Date
}

export interface Company {
  id: number
  name: string
  description: string
  employee_population_range: string
  site_url: string
  reps: CompanyRep[]
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
