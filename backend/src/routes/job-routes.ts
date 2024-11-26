import { Router } from 'express'
import { createJob, getJobs } from '../controllers/JobController'
import { validateBody } from '../middlewares/request-validators'
import { JobSchema } from '@shared/pack/dist'

const router = Router()

router.get('/:company_id/jobs', getJobs)
router.post('/:company_id/jobs/create', validateBody(JobSchema), createJob)

export default router
