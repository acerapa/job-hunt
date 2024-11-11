import { type RouteRecordRaw } from 'vue-router'
import NavLayout from '@/layouts/NavLayout.vue'

export default <RouteRecordRaw[]>[
  {
    path: '/hunter',
    name: 'hunter',
    redirect: {
      name: 'job-list'
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
