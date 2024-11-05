import { Router } from 'express'

const router = Router()
import { authenticate, authenticateSetCookies, refresh } from '../controllers/AuthController'

router.post('/login', authenticate)
router.post('/refresh', refresh)
router.get('/test-cookie', authenticateSetCookies)

export default router
