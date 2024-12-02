import { z } from 'zod'
import { AnswerSchema } from './answer'

export const ApplicationSchema = z.object({
  profile_id: z.number().min(1, 'Profile Id is Required'),
  job_id: z.number().min(1, 'Job Id is Required'),
  answers: z.array(AnswerSchema).nullable().optional()
})
