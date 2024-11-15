import { Router } from 'express'
const router = Router()

// middlewares
import { validateAccessRefreshToken } from '../middlewares/validate-access-refresh-token'

// import companyRoutes from './company-routes'
import userRoutes from './user-routes'
import authRoute from './auth-routes'
import profileRoutes from './profile-routes'

router.use('/auth', authRoute)
router.use('/users', validateAccessRefreshToken, userRoutes)
router.use('/profile', validateAccessRefreshToken, profileRoutes)
// router.use('/company', validateAccessRefreshToken, companyRoutes)

export default router
