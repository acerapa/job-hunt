import { Router } from 'express'
import { getShifts } from '../controllers/SettingsController'

const router = Router()

// WARNING: routes here might be at risk of collieding with other routes
router.get('/company/:company_id/shifts', getShifts)

export default router
