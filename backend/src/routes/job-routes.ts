import { Router } from 'express'
import { createJob, getJobById, getJobs, updateJob } from '../controllers/JobController'
import { validateBody } from '../middlewares/request-validators'
import { JobSchema } from '@shared/pack/dist'

const router = Router()

router.get('/jobs/:job_id', getJobById)
router.get('/:company_id/jobs', getJobs)
router.post('/:company_id/jobs/create', validateBody(JobSchema), createJob)
router.post('/jobs/:id/update', validateBody(JobSchema.partial()), updateJob)

export default router
