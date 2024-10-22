import NavLayout from '@/layouts/NavLayout.vue'

export default [
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
      }
    ]
  }
]
