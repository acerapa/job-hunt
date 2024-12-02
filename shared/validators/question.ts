import { z } from 'zod'
import { QuestionType } from '../types'

export const QuestionSchema = z.object({
  id: z.number().nullable().optional(),
  question: z.string().min(1, 'Question is required!'),
  type: z.enum([
    QuestionType.CHECKBOX,
    QuestionType.DATE,
    QuestionType.NUMBER,
    QuestionType.RADIO,
    QuestionType.SELECT,
    QuestionType.TEXT,
    QuestionType.TEXTAREA,
    QuestionType.TIME
  ]),
  is_required: z.boolean().optional()
})
