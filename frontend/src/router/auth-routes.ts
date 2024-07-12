export default [
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
        path: "",
        name: 'signup',
        component: () => import('@/views/Auth/SignupPage.vue'),
      },
      {
        path: ":id/type",
        name: "user-type",
        component: () => import('@/views/Auth/SignupUserTypePage.vue')
      },
      {
        path: ":id/:type/info",
        name: "user-info",
        component: () => import('@/views/Auth/SignupUserInforPage.vue')
      },
    ],
  }
]
