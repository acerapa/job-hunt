import { Router } from 'express'
import {
  createConversation,
  getConversations,
  getMessages
} from '../controllers/ConversationController'
import { validateBody } from '../middlewares/request-validators'
import { ConversationSchema } from '@shared/pack/dist'

const router = Router()

router.get('/all', getConversations)
router.get('/:conversation_id/messages', getMessages)
router.post('/create', validateBody(ConversationSchema), createConversation)

export default router
