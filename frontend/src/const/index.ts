import type { User } from '@shared/pack'

export const enum LocalStorageKeys {
  ACCESS = 'access',
  REFRESH = 'refresh',
  CURRENT_USER = 'current_user',
  CURRENT_USER_OBJECT = 'current_user_object'
}

export const getAuthUserLocalSt = (): User | null => {
  const strUser = localStorage.getItem(LocalStorageKeys.CURRENT_USER_OBJECT)
  let user: User | null = null
  if (strUser) {
    user = JSON.parse(strUser) as User
  }

  return user
}
