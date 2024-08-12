import { authenticatedApi } from '@/api'
import { getAuthUserLocalSt } from '@/const'
import type { ApiResponse, User } from '@shared/pack'
import { type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'

const includedRoutes = ['signin', 'signup', 'landing']
// export const registrationGuard = async (
//   to: RouteLocationNormalized,
//   from: RouteLocationNormalized,
//   next: NavigationGuardNext
// ) => {
//   let user: User | null = getAuthUserLocalSt()
//   if (includedRoutes.includes(to.name as string) && !user) {
//     next()
//   } else if (includedRoutes.includes(to.name as string) && user) {
//     next({ name: 'dashboard' })
//   } else {
//     user = user ? user : await fetchUser(to)

//     if (!user) {
//       next({ name: 'signin' })
//     } else {
//       const { done_type, is_completed } = user.user_registration
//       console.log(to.name, user, done_type, is_completed)
//       if (!done_type && !is_completed) {
//         next({
//           name: 'user-type',
//           params: {
//             id: user.id
//           }
//         })
//       } else if (done_type && !is_completed) {
//         next({
//           name: 'user-info',
//           params: {
//             id: user.id,
//             type: user.type
//           }
//         })
//       } else {
//         next()
//       }
//     }
//   }
// }

export const registrationGuard = async (
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
      next({
        name: 'dashboard'
      })
    } else {
      next()
    }

    return
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
