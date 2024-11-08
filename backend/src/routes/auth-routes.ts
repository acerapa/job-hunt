import { Router } from 'express'

// middlewares
import { validateAccessRefreshToken } from '../middlewares/validate-access-refresh-token'

const router = Router()
import { authenticate, authUser, signOut } from '../controllers/AuthController'
import { register } from '../controllers/UserController'
import { validateBody } from '../middlewares/request-validators'
import { UserCreationSchema } from '@shared/pack/dist'

router.post('/login', authenticate)
router.get('/sign-out', validateAccessRefreshToken, signOut)
router.get('/authenticated', validateAccessRefreshToken, authUser)
router.post('/sign-up', validateBody(UserCreationSchema), register)

export default router
