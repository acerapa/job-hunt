import { Router } from 'express'
import {
  getById,
  getIndustries,
  register,
  registerShift,
  update,
  updateCreateCompanyAddress
} from '../controllers/CompanyController'
import { validateBody } from '../middlewares/request-validators'
import {
  CompanyUpdateSchema,
  AddressUpdateSchema,
  CompanyCreateSchema,
  ShiftSchema
} from '@shared/pack/dist'

const router = Router()

router.get('/company/:id', getById)
router.get('/company/industry/all', getIndustries)
router.post('/:user_id/company/register', validateBody(CompanyCreateSchema), register)
router.post('/company/update/:id', validateBody(CompanyUpdateSchema), update)
router.post(
  '/company/update/:id/address',
  validateBody(AddressUpdateSchema),
  updateCreateCompanyAddress
)

// shifts
router.post('/company/:id/shift/register', validateBody(ShiftSchema), registerShift)

// job routes
import jobRoutes from './job-routes'
router.use('/company', jobRoutes)

export default router
