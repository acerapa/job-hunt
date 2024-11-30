import { Router } from 'express'
import {
  deleteShift,
  getShiftById,
  getShifts,
  updateShift
} from '../controllers/SettingsController'
import { validateBody } from '../middlewares/request-validators'
import { ShiftSchema } from '@shared/pack/dist'

const router = Router()

// WARNING: routes here might be at risk of collieding with other routes
router.get('/company/:company_id/shifts', getShifts)
router.get('/company/shifts/:id', getShiftById)
router.post('/company/shifts/:id/update', validateBody(ShiftSchema), updateShift)
router.delete('/company/shifts/:id/delete', deleteShift)

export default router
