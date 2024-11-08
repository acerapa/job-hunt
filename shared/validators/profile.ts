import { z } from 'zod'

export const ProfileSchema = z.object({
  cover_letter: z.string().optional(),
  resume: z.string().optional(),
  profile_pic: z.string().optional(),
  expected_salary_range: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  address_id: z.number().optional(),
  user_id: z.number().optional()
})
