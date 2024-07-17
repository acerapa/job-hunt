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
