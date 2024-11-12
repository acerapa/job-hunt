import { Router } from 'express'
import { updateCreateProfileAddress, updateProfile } from '../controllers/ProfileController'
import { ProfileSchema } from '@shared/pack/dist'
import { validateBody } from '../middlewares/request-validators'

const router = Router()

router.post('/:id/update', validateBody(ProfileSchema), updateProfile)
router.post('/:id/update-address', validateBody(ProfileSchema), updateCreateProfileAddress)

export default router
