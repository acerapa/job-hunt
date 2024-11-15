import {
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
  useRouter
} from 'vue-router'
import NavLayout from '@/layouts/NavLayout.vue'
import { useAuthStore } from '@/stores/auth-store'
import { UserType } from '@shared/pack'

export default <RouteRecordRaw[]>[
  {
    path: '/provider',
    name: 'provider',
    redirect: {
      name: 'provider-dashboard'
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
        if (authUser.type === UserType.PROVIDER) {
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
        path: 'dashboard',
        name: 'provider-dashboard',
        component: () => import('@/views/job-provider/DashboardPage.vue')
      },
      {
        path: 'jobs',
        name: 'provider-jobs',
        component: () => import('@/views/job-provider/JobListPage.vue')
      },
      {
        path: 'jobs/create',
        name: 'provider-jobs-create',
        component: () => import('@/views/job-provider/CreateJobPage.vue')
      },
      {
        path: 'jobs/:id/applicants',
        name: 'provider-jobs-applicants',
        component: () => import('@/views/job-provider/ApplicantListPage.vue')
      },
      {
        path: 'profile',
        name: 'provider-profile',
        component: () => import('@/views/job-provider/ProfilePage.vue')
      },
      {
        path: 'account-settings',
        name: 'provider-account-settings',
        component: () => import('@/views/job-provider/AccountSettingsPage.vue')
      }
    ]
  }
]
