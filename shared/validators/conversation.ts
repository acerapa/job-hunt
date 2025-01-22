import { z } from 'zod'
import { FileSchema } from './file'

export const ConversationSchema = z.object({
  is_pinned: z.boolean().optional(),
  members: z.array(z.union([z.string(), z.number()])).min(2, 'At least 2 members are required!')
})

export const MessageSchema = z.object({
  message: z.string(),
  sender_id: z.number().min(1, 'Sender is required!'),
  is_seen: z.boolean().optional(),
  files: z.array(z.number()).min(0).optional(),
  conversation_id: z.number().min(1, 'Conversation is required!')
})
