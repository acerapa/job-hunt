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
  is_pinned: boolean
  sender: ConvoMember
  receviers: ConvoMember[]
  last_message?: Message<Object, User>
  messages: Message<Object, User>[]
  unread_messages_number: number
  unread_messages: Message<Object, User>[]
}

export interface ConvoMember {
  user?: User
  user_id: number
  full_name: string
  is_active: boolean
  is_typing?: boolean
}
