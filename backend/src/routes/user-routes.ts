import { Router } from 'express'
import { all, getOne, update } from '../controllers/UserController'
import { validateBody } from '../middlewares/request-validators'
import { UserUpdateSchema } from '@shared/pack/dist'

// Company routes
import companyRoutes from './company-routes'

const router = Router()

router.get('/all', all)
router.get('/:id', getOne)
router.post('/:id/update', validateBody(UserUpdateSchema), update)

// Internal routes
router.use('/', companyRoutes)

export default router
