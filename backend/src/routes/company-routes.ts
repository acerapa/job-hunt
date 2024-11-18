import { Router } from 'express'
import { register, update, updateCreateCompanyAddress } from '../controllers/CompanyController'
import { validateBody } from '../middlewares/request-validators'
import { CompanySchema, CompanyUpdateSchema, AddressUpdateSchema } from '@shared/pack/dist'

const router = Router()

router.post('/:user_id/company/register', validateBody(CompanySchema), register)
router.post('/company/update/:id', validateBody(CompanyUpdateSchema), update)
router.post(
  '/company/update/:id/address',
  validateBody(AddressUpdateSchema),
  updateCreateCompanyAddress
)

export default router
