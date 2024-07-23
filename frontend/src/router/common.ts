import HomePage from '@/views/HomePage.vue'
import NavLayout from '@/layouts/NavLayout.vue'

export default [
  {
    path: '/',
    redirect: {
      name: 'landing'
    },
    component: NavLayout,
    children: [
      {
        path: '',
        name: 'landing',
        component: HomePage
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardPage.vue')
      }
    ]
  }
]
