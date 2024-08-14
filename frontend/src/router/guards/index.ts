import { authenticatedApi } from '@/api'
import { getAuthUserLocalSt } from '@/const'
import { UserType, type ApiResponse, type User } from '@shared/pack'
import providerRoutes from '../provider-routes'
import { type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'

const providerRouteNames = providerRoutes[0].children.map((route) => route.name)
const includedRoutes = ['signin', 'signup', 'landing']
export const mainGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  let user: User | null = getAuthUserLocalSt()

  if (includedRoutes.includes(to.name as string) && !user) {
    // Allow navigation to signin, signup, or landing if no user is present
    next()
    return // Important to return here to prevent further checks
  }

  if (includedRoutes.includes(to.name as string) && user) {
    // Redirect to dashboard if the route is in includedRoutes but user exists
    next({ name: 'dashboard' })
    return
  }

  // Fetch user if not present
  user = user ? user : await fetchUser(to)

  if (!user) {
    // Redirect to signin if no user found
    next({ name: 'signin' })
    return
  }

  const { done_type, is_completed } = user.user_registration

  if (!done_type && !is_completed) {
    if (to.name !== 'user-type') {
      next({
        name: 'user-type',
        params: {
          id: user.id
        }
      })
    } else {
      next() // Allow navigation to user-type if it's already the target route
    }
    return
  }

  if (done_type && !is_completed) {
    if (to.name !== 'user-info') {
      next({
        name: 'user-info',
        params: {
          id: user.id,
          type: user.type
        }
      })
    } else {
      next() // Allow navigation to user-info if it's already the target route
    }
    return
  }

  if (done_type && is_completed) {
    if (to.name !== 'dashboard') {
      if (providerRouteNames.includes(to.name as string) && user.type == UserType.PROVIDER) {
        next()
        return
      } else {
        next({
          name: 'dashboard'
        })
      }
      return
    }
  }

  // Proceed if all conditions are satisfied
  next()
}

// inside helper functions
const getUserId = (to: RouteLocationNormalized): string => {
  return to.params.id ? (to.params.id as string) : (localStorage.getItem('current_user') as string)
}

const fetchUser = async (to: RouteLocationNormalized): Promise<User | null> => {
  const res: ApiResponse<{ user: User }> = await authenticatedApi(`users/${getUserId(to)}`)
  return res.data.user
}
