import { type RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import NavLayout from '@/layouts/NavLayout.vue'

export default <RouteRecordRaw[]>[
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
        path: '/messages',
        name: 'messages',
        component: () => import('@/views/MessagesPage.vue')
      }
    ]
  }
]
