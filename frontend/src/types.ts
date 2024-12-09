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
