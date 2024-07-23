import { z } from 'zod'

export const UserCreationSchema = z.object({
  username: z.string().min(2, "Username is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must have aleast 6 characters")
})

export const UserUpdateSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  type: z.number().optional(),
  mobile_number: z.string().optional()
})

export const UserRegistrationUpdateSchema = z.object({
  done_type: z.boolean().optional(),
  is_completed: z.boolean().optional()
})

export const CombinedUserUpdateSchema = z.object({
  user: UserCreationSchema,
  user_registration: UserRegistrationUpdateSchema
})
