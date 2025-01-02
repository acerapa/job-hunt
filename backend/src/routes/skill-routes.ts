import { Router } from 'express'
import { getSkills, createSkill } from '../controllers/SkillController'
import { validateBody } from '../middlewares/request-validators'
import { SkillSchema } from '@shared/pack/dist'

const router = Router()

router.get('/all', getSkills)
router.post('/create', validateBody(SkillSchema), createSkill)

export default router
