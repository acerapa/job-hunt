import { Request, Response, Router } from 'express'
const router = Router()

// middlewares
import { validateAccessRefreshToken } from '../middlewares/validate-access-refresh-token'

import userRoutes from './user-routes'
import authRoute from './auth-routes'
import profileRoutes from './profile-routes'
import settingRoutes from './setting-routes'
import conversationRoutes from './conversation-routes'
import { getAllJobs } from '../controllers/JobController'

router.use('/auth', authRoute)
router.use('/users', validateAccessRefreshToken, userRoutes)
router.use('/profile', validateAccessRefreshToken, profileRoutes)
router.use('/settings', validateAccessRefreshToken, settingRoutes)
router.use('/conversations', validateAccessRefreshToken, conversationRoutes)

// get all published jobs
router.get('/published-jobs', getAllJobs)

export default router
