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

export enum ApplicantStatus {
  PENDING = 1,
  UNREVIEWED = 1,
  REVIEWED = 2,
  INTERVIEWING = 3,
  OFFERED = 4,
  DECLINED = 5
}

export interface Applicant {
  job: string
  name: string
  applied_on: Date
  status: ApplicantStatus
}
