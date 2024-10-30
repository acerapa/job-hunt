import { type RouteRecordRaw } from 'vue-router'
import NavLayout from '@/layouts/NavLayout.vue'

export default <RouteRecordRaw[]>[
  {
    path: '/provider',
    name: 'provider',
    redirect: {
      name: 'provider-dashboard'
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
      }
    ]
  }
]
