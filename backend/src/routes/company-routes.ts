import { Router } from 'express'
import { register, update } from '../controllers/CompanyController'
import { validateBody } from '../middlewares/request-validators'
import { CompanySchema, CompanyUpdateSchema } from '@shared/pack/dist'

const router = Router()

router.post('/:user_id/company/register', validateBody(CompanySchema), register)
router.post('/:user_id/company/update/:id', validateBody(CompanyUpdateSchema), update)

export default router
