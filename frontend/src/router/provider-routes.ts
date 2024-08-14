import NavLayout from '@/layouts/NavLayout.vue'
export default [
  {
    path: '/',
    redirect: {
      name: 'provider-jobs'
    },
    component: NavLayout,
    children: [
      {
        path: '/provider/jobs',
        name: 'provider-jobs',
        component: () => import('@/views/JobProviderPages/JobListPage.vue')
      }
    ]
  }
]
