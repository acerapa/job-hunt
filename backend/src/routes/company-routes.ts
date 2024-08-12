import { Router } from 'express'
import { all, register } from '../controllers/CompanyController'
import { validateBody } from '../middlewares/request-validators'
import { CombinedCreateCompanyAndRedSchema } from '@shared/pack/dist'

const router = Router()

router.get('/all', all)
router.post('/register', validateBody(CombinedCreateCompanyAndRedSchema), register)

export default router
