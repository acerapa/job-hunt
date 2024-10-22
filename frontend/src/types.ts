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

export interface Company {}
