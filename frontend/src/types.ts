export interface Job {
  title: string
  company: {
    name: string
    image: string
    rating: number
    address: string
  }
  description: string
  work_type: string
  exp_level: string
  work_setup: string
  posted_on: string
  tags: string[]
}

export enum JobViewStatus {
  ACTIVE = 'active',
  CLOSE = 'close'
}

export interface JobView {
  title: string
  hunters: number
  status: JobViewStatus
  added_on: Date
}

export interface Company {}

export interface Activity {
  type: string
  status: string
  description: string
}
