import { Router } from 'express'
import { all } from '../controllers/CompanyController'
const router = Router()

router.get('/all', all)

export default router
