import { Router } from 'express'
import { all, getOne, update } from '../controllers/UserController'
import { validateBody } from '../middlewares/request-validators'
import { ApplicationSchema, UserUpdateSchema } from '@shared/pack/dist'

// Company routes
import companyRoutes from './company-routes'
import { createApplication } from '../controllers/ApplicationController'

const router = Router()

router.get('/all', all)
router.get('/:id', getOne)
router.post('/:id/update', validateBody(UserUpdateSchema), update)

// external controllers
router.post('/job/apply', validateBody(ApplicationSchema), createApplication)

// Internal routes
router.use('/', companyRoutes)

export default router
