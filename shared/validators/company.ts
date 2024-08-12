import { z } from 'zod'
import { AddressSchema, CompanyRepSchema } from './user'

export const CompanySchema = z.object({
  name: z.string().min(1, 'Company name is required!'),
  employee_range: z.string().min(1, 'Employee range is required'),
  description: z.string().min(1, 'Description is required!'),
  site_url: z.string().optional()
})

export const CombinedCreateCompanyAndRedSchema = z.object({
  company: CompanySchema,
  rep: CompanyRepSchema,
  address: AddressSchema
})

export const CombinedUpdateCompanyAndCompanySchema = z.object({
  company: CompanySchema.partial(),
  rep: CompanyRepSchema.partial(),
  address: AddressSchema
}).partial()
