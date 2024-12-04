import { z } from 'zod'
import { AddressSchema, CompanyRepSchema } from './user'
import { CompanyType } from '../types'

export const CompanySchema = z.object({
  name: z.string().min(1, 'Company name is required!'),
  description: z.string().min(1, 'Description is required!'),
  employee_range: z.string().optional(),
  website: z.string().optional(),
  type: z
    .enum([
      CompanyType.STARTUP,
      CompanyType.CORPORATION,
      CompanyType.NON_PROFIT,
      CompanyType.GOVERNMENT,
      CompanyType.OTHERS
    ])
    .optional(),
  logo: z.string().nullable().optional(),
  address_id: z.number().optional(),
  industry: z.union([z.string(), z.number()]).optional(),
  mission: z.string().optional(),
  vision: z.string().optional()
})

export const CompanyUpdateSchema = CompanySchema.partial()

export const CompanyCreateSchema = z.object({
  company: CompanySchema,
  address: AddressSchema
})

export const CombinedUpdateCompanyAndCompanySchema = z
  .object({
    company: CompanySchema.partial(),
    rep: CompanyRepSchema.partial(),
    address: AddressSchema
  })
  .partial()

export const ShiftSchema = z.object({
  name: z.string().min(1, 'Shift name is required!'),
  start_time: z.string().min(1, 'Start time is required!'),
  end_time: z.string().min(1, 'End time is required!')
})
