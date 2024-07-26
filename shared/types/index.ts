export * from './enums.js'
export * from './frontend.js'
export * from './models.js'

export const enum UserType {
  HUNTER = 1,
  PROVIDER = 2
}

export interface UserCred {
  usercred: string;
  password: string;
}
