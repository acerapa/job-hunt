import { Router } from 'express'
import { all, getOne, update } from '../controllers/UserController'
import { validateBody } from '../middlewares/request-validators'
import { UserUpdateSchema } from '@shared/pack/dist'

const router = Router()

router.get('/all', all)
router.get('/:id', getOne)
// router.post("/register", validateBody(UserCreationSchema), register)
router.post('/:id/update', validateBody(UserUpdateSchema), update)

export default router
