import { authenticatedApi } from '@/api';
import type { ApiResponse, User } from '@shared/pack';
import { type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'

export const incompleteRegistrationGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const includedRoutes = ['signin', 'signup', 'user-type', 'user-info']
  if (!includedRoutes.includes(to.name as string)) {
    const user_id = getUserId(to)
    const res: ApiResponse<{user: User}> = await authenticatedApi(`users/${user_id}`)
    const user: User | null = res.data.user

    if (user) {
      const { done_type, is_completed } = user.user_registration
      if (!done_type) {
        next({
          name: 'user-type',
          params: {
            id: user.id
          }
        })
      } else if (done_type && !is_completed) {
        next({
          name: 'user-info',
          params: {
            id: user.id,
            type: user.type
          }
        })
      } else if (done_type && is_completed) {
        next()
      }
    } else {
     next({name: 'signin'})  
    }
  } else {
    next()
  }
}


// inside helper functions
const getUserId = (to: RouteLocationNormalized): string => {
  return to.params.id ? to.params.id as string : localStorage.getItem('current_user') as string
}
