import {
  type RouteLocationNormalized,
  type RouteRecordRaw,
  type NavigationGuardNext,
  useRouter
} from 'vue-router'
import NavLayout from '@/layouts/NavLayout.vue'
import { useAuthStore } from '@/stores/auth-store'
import { UserType } from '@shared/pack'

export default <RouteRecordRaw[]>[
  {
    path: '/hunter',
    name: 'hunter',
    redirect: {
      name: 'job-list'
    },
    beforeEnter: async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const router = useRouter()
      const authStore = useAuthStore()
      const authUser = await authStore.getAuthUser()
      if (authUser) {
        if (authUser.type && authUser.type === UserType.HUNTER) {
          next()
        } else {
          router.back()
        }
      } else {
        next({ name: 'signin' })
      }
    },
    component: NavLayout,
    children: [
      {
        path: 'job-list',
        name: 'job-list',
        component: () => import('@/views/job-hunter/ListingPage.vue')
      },
      {
        path: 'applications',
        name: 'applications',
        component: () => import('@/views/job-hunter/ApplicationPage.vue')
      },
      {
        path: 'application-form/:job_id',
        name: 'application-form',
        component: () => import('@/views/job-hunter/ApplicationForm.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/job-hunter/ProfilePage.vue')
      }
    ] as RouteRecordRaw[]
  }
].map((route) => {
  route.children = route.children.map((childRoute: RouteRecordRaw) => {
    childRoute.meta = {
      requiresAuth: true
    }
    return childRoute
  })
  return route
})
