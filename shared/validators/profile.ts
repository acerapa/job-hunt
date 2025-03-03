import { z } from 'zod'
import { BaseFileSchema } from './file'

export const ProfileSchema = z.object({
  cover_letter: z.string().nullable().optional(),
  resume: z.string().nullable().optional(),
  profile_pic: BaseFileSchema.nullable().optional(),
  expected_salary_range: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  linkedin: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
  address_id: z.number().nullable().optional(),
  user_id: z.number().nullable().optional()
})
