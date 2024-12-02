import { z } from 'zod'

export const AnswerSchema = z.object({
  answer: z.string().min(1, 'Answer is required!'),
  question_id: z.number().min(1, 'Question is required!'),
  application_id: z.number().min(1, 'Application is required!')
})
