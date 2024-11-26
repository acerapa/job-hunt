import { Router } from 'express'
import { register, update, updateCreateCompanyAddress } from '../controllers/CompanyController'
import { validateBody } from '../middlewares/request-validators'
import { CompanyUpdateSchema, AddressUpdateSchema, CompanyCreateSchema } from '@shared/pack/dist'

const router = Router()

router.post('/:user_id/company/register', validateBody(CompanyCreateSchema), register)
router.post('/company/update/:id', validateBody(CompanyUpdateSchema), update)
router.post(
  '/company/update/:id/address',
  validateBody(AddressUpdateSchema),
  updateCreateCompanyAddress
)

// job routes
import jobRoutes from './job-routes'
router.use('/company', jobRoutes)

export default router
