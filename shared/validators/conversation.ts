import { z } from 'zod'

export const ConversationSchema = z.object({
  is_pinned: z.boolean().optional(),
  members: z.array(z.union([z.string(), z.number()])).min(2, 'At least 2 members are required!')
})
