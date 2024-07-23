export * from './enums.js'
export * from './frontend.js'

export const enum UserType {
  HUNTER = 1,
  PROVIDER = 2
}

export type Tag = {
  name: string
}

export type Company = {
  name: string
  logo: string
  ratings: number
}

export type Job = {
  title: string
  description: string,
  tags: Tag[]
  company: Company
}

// this will be temporary for now
export type UserRegistration = {
  id: number
  done_type: boolean
  is_completed: boolean
  user_id: number
}

export type User = {
  id: number
  first_name?: number
  last_name?: number
  type?: UserType
  email: string
  username: string
  password: string
  created_at?: Date
  updated_at?: Date
  user_registration?: UserRegistration
}
