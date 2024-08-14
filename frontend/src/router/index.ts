import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from '@/router/auth-routes'
import commonRoutes from '@/router/common'
import providerRoutes from './provider-routes'

import { mainGuard } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...commonRoutes, ...authRoutes, ...providerRoutes]
})

router.beforeEach(async (to, from, next) => {
  await mainGuard(to, from, next)
})

export default router
