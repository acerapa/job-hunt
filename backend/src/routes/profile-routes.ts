import { Router } from 'express'
import {
  getProfileById,
  updateCreateProfileAddress,
  updateProfile
} from '../controllers/ProfileController'
import { AddressUpdateSchema, ProfileSchema } from '@shared/pack/dist'
import { validateBody } from '../middlewares/request-validators'

const router = Router()

router.get('/:id', getProfileById)
router.post('/:id/update', validateBody(ProfileSchema), updateProfile)
router.post('/:id/update-address', validateBody(AddressUpdateSchema), updateCreateProfileAddress)

export default router
