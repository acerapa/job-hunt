import { z } from 'zod'

export const AddressSchema = z.object({
  address1: z.string().min(1, 'Address 1 is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postal: z.string().min(1, 'Postal/Zip code is required'),
  province: z.string().min(1, 'Province is required'),
  country: z.string().min(1, 'Country is required')
})

export const AddressUpdateSchema = z.object({
  address1: z.string().min(1, 'Address 1 is required').optional(),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required').optional(),
  postal: z.string().min(1, 'Postal/Zip code is required').optional(),
  province: z.string().min(1, 'Province is required').optional(),
  country: z.string().min(1, 'Country is required').optional()
})

export const UserCreationSchema = z.object({
  username: z.string().min(2, 'Username is required'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must have aleast 6 characters')
})

export const UserUpdateSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  first_name: z.string().min(1, 'First name is required').optional(),
  last_name: z.string().min(1, 'Last name is required').optional(),
  type: z.number().optional(),
  gender: z.number().max(2).min(1).optional(),
  password: z.string().min(6, 'Password must have atleast 6 characters').optional(),
  phone: z.string().min(1, 'Contact number name is required').optional()
})

export const UserRegistrationUpdateSchema = z.object({
  done_type: z.boolean().optional(),
  is_completed: z.boolean().optional()
})

export const CombinedUserUpdateSchema = z.object({
  user: UserCreationSchema,
  user_registration: UserRegistrationUpdateSchema
})

export const UserAuthSchema = z.object({
  usercred: z.string().min(2, { message: 'Username or email must have atleast 2 characters' }),
  password: z.string().min(6, 'Password must have atleast 6 characters')
})

export const CompanyRepSchema = z.object({
  position: z.string().min(1, 'Position is required'),
  user_id: z.string().or(z.number()),
  company_id: z.string().or(z.number()).optional()
})

// partials
export const PartialCombinedUserUpdateSchema = z
  .object({
    user: UserUpdateSchema,
    user_registration: UserRegistrationUpdateSchema,
    address: AddressSchema.partial()
  })
  .partial()
