import { Router } from 'express'
import { createProfile } from '../controllers/ProfileController'
import { ProfileSchema } from '@shared/pack/dist'
import { validateBody } from '../middlewares/request-validators'

const router = Router()

router.post('/create', validateBody(ProfileSchema), createProfile)

export default router
