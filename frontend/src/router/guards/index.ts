import { useAuthStore } from '@/stores/auth-store'
import { UserType } from '@shared/pack'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const userInfoGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  const authUser = await authStore.getAuthUser()

  if (authUser) {
    if (authUser.type === UserType.PROVIDER) {
      if (authUser.company) {
        next({ name: 'provider' })
      } else {
        next()
      }
    } else if (authUser.type === UserType.HUNTER) {
      if (authUser.profile) {
        next({ name: 'hunter' })
      } else {
        next()
      }
    } else {
      next({ name: 'user-type' })
    }
  } else {
    next({ name: 'signin' })
  }
}
