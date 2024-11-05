import { Address, Company, User } from './models'

export type UserCreation = {
  email: string
  username: string
  password: string
}

export type UserInfoCreation = {
  first_name: string
  last_name: string
  mobile_number: string
  professional_summary: string
  email?: string
}

export type UserUpdate<P, C> = {
  id: number
  user: Partial<User<P, C>>
  address: Partial<Address>
}

export type CompanyCreation<U, J> = {
  company: Partial<Company<U, J>>
  address: Partial<Address>
}
