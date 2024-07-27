import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from '@/router/auth-routes'
import commonRoutes from '@/router/common'
import { incompleteRegistrationGuard } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...commonRoutes, ...authRoutes]
})

router.beforeEach(async (to, from, next) => {
  await incompleteRegistrationGuard(to, from, next)
})

export default router
