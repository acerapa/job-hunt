import { z } from 'zod'

export const CompanySchema = z.object({
  company_name: z.string().min(1, 'Company name is required!'),
  employee_range: z.string().optional(),
  description: z.string()
})
