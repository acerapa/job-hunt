import { z } from 'zod'

export const ConversationSchema = z.object({
  is_pinned: z.boolean().optional(),
  members: z.array(z.union([z.string(), z.number()])).min(2, 'At least 2 members are required!')
})

export const MessageSchema = z.object({
  message: z.string().min(1, 'Message is required!'),
  sender_id: z.number().min(1, 'Sender is required!'),
  conversation_id: z.number().min(1, 'Conversation is required!')
})
