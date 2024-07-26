import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from '@/router/auth-routes'
import commonRoutes from '@/router/common'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...commonRoutes, ...authRoutes]
})

export default router
