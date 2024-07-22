import { z } from 'zod'

export const UserCreationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})
