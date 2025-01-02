import { z } from 'zod'
import { SkillType } from '../types'

export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  type: z.enum([SkillType.TECHNICAL, SkillType.SOFT])
})

export const SkillIDSchema = z.object({
  skills: z.array(z.number())
})
