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
        component: () => import('@/views/MessagesPage.vue'),
        beforeEnter: (to, from, next) => {
          if (window.screen.width <= 600) {
            if (to.query.id) {
              next()
            } else {
              next({ name: 'convos' })
            }
          } else {
            next()
          }
        }
      },
      {
        path: '/convos',
        name: 'convos',
        component: () => import('@/views/ConvosPage.vue'),
        beforeEnter: (to, from, next) => {
          if (window.screen.width > 600) {
            next({ name: 'messages' })
          } else {
            next()
          }
        }
      }
    ]
  }
]
