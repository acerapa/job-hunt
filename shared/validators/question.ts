import { z } from 'zod'

export const QuestionSchema = z.object({
  question: z.string().min(1, 'Question is required!'),
  is_required: z.boolean().optional()
})
