import { Router } from 'express'

// middlewares
import { validateAccessRefreshToken } from '../middlewares/validate-access-refresh-token'

const router = Router()
import { authenticate, authUser, signOut } from '../controllers/AuthController'

router.post('/login', authenticate)
router.get('/sign-out', validateAccessRefreshToken, signOut)
router.get('/authenticated', validateAccessRefreshToken, authUser)

export default router
