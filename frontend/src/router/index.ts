import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from '@/router/auth-routes'
import commonRoutes from '@/router/common'
import jobHunterRoutes from '@/router/job-hunter'
import jobProviderRoutes from '@/router/job-provider'
// import { registrationGuard } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...commonRoutes, ...authRoutes, ...jobHunterRoutes, ...jobProviderRoutes]
})

// TODO: revise this code here
// router.beforeEach(async (to, from, next) => {
//   await registrationGuard(to, from, next)
// })

export default router
