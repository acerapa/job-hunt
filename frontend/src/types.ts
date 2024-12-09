import type { Message, User } from '@shared/pack'

export interface Activity {
  type: string
  status: string
  description: string
}

export enum CompanyDetailsNav {
  OVERVIEW = 'overview',
  JOBS = 'jobs',
  REVIEWS = 'reviews'
}

export const CompanyDetailsNavMap = {
  [CompanyDetailsNav.OVERVIEW]: 'Overview',
  [CompanyDetailsNav.JOBS]: 'Jobs',
  [CompanyDetailsNav.REVIEWS]: 'Reviews'
}

export interface Convo {
  id: number
  sender: User
  is_pinned: boolean
  receviers: User[]
  last_message?: Message
  unread_messages: number
}
