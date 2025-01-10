import { Router } from 'express'
import {
  createConversation,
  createMessage,
  getConversations,
  getMessages,
  updateMessage
} from '../controllers/ConversationController'
import { validateBody } from '../middlewares/request-validators'
import { ConversationSchema, MessageSchema } from '@shared/pack/dist'
import { createFile } from '../services/file.service'

const router = Router()

router.get('/all', getConversations)
router.get('/:conversation_id/messages', getMessages)
router.post('/create', validateBody(ConversationSchema), createConversation)
router.post('/messages/create', createFile, validateBody(MessageSchema, true), createMessage)
router.post('/messages/:message_id/update', validateBody(MessageSchema.partial()), updateMessage)

export default router
