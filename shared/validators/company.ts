import { z } from 'zod'
import { AddressSchema, CompanyRepSchema } from './user'
import { CompanyType } from '../types'

export const CompanySchema = z.object({
  name: z.string().min(1, 'Company name is required!'),
  description: z.string().min(1, 'Description is required!'),
  employee_range: z.string().optional(),
  website: z.string().optional(),
  type: z.enum([CompanyType.STARTUP, CompanyType.CORPORATION, CompanyType.NON_PROFIT]).optional(),
  logo: z.string().optional(),
  address_id: z.number().optional(),
  industry: z.string().optional()
})

export const CompanyUpdateSchema = CompanySchema.partial()

export const CombinedCreateCompanyAndRedSchema = z.object({
  company: CompanySchema,
  rep: CompanyRepSchema,
  address: AddressSchema
})

export const CombinedUpdateCompanyAndCompanySchema = z
  .object({
    company: CompanySchema.partial(),
    rep: CompanyRepSchema.partial(),
    address: AddressSchema
  })
  .partial()
