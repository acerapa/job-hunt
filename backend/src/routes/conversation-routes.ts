import { Router } from 'express'
import { createConversation, getConversations } from '../controllers/ConversationController'
import { validateBody } from '../middlewares/request-validators'
import { ConversationSchema } from '@shared/pack/dist'

const router = Router()

router.get('/all', getConversations)
// TODO: add middleware to check if data is valid
router.post('/create', validateBody(ConversationSchema), createConversation)

export default router
