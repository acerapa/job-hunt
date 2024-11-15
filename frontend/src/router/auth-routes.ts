import { type RouteRecordRaw } from 'vue-router'
import { userInfoGuard } from './guards'

export default <RouteRecordRaw[]>[
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/Auth/SigninPage.vue')
  },
  {
    path: '/signup',
    redirect: {
      name: 'signup'
    },
    children: [
      {
        path: '',
        name: 'signup',
        component: () => import('@/views/Auth/SignupPage.vue')
      },
      {
        path: 'type',
        name: 'user-type',
        component: () => import('@/views/Auth/SignupUserTypePage.vue')
      },
      {
        path: ':type/info',
        name: 'user-info',
        beforeEnter: userInfoGuard,
        component: () => import('@/views/Auth/SignupUserInforPage.vue')
      }
    ]
  }
]
