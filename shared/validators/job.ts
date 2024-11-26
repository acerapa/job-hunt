import { z } from 'zod'
import { JobStatus, WorkSetup, WorkType } from '../types'
import { AddressSchema } from './user'

export const JobSchema = z.object({
  title: z.string().min(1, 'Title is required!'),
  description: z.string().min(1, 'Description is required!'),
  salary_range: z.string().optional(),
  posted_on: z.date().optional(),
  status: z.enum([JobStatus.CLOSED, JobStatus.ACTIVE, JobStatus.DRAFT]),
  closing_date: z.date().optional(),
  work_setup: z.array(z.enum([WorkSetup.HYBRID, WorkSetup.ONSITE, WorkSetup.REMOTE])),
  work_type: z.array(z.enum([WorkType.FULLTIME, WorkType.INTERNSHIP, WorkType.PARTTIME])),
  is_flex: z.boolean().optional(),
  show_salary_range: z.boolean().optional(),
  responsibilities: z.string().min(1, 'Responsibilities is required!'),
  qualifications: z.string().min(1, 'Qualifications is required!'),
  what_we_offer: z.string().min(1, 'What we offer is required!'),
  application_url: z.string().optional(),
  others: z.string().optional(),
  address_id: z.number().optional(),
  address: AddressSchema.partial().optional()
})
