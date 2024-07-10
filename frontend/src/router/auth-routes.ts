export default [
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/Auth/SigninPage.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/Auth/SignupPage.vue')
  }
]
