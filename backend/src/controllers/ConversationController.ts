import { Request, Response } from 'express'
import { Conversation } from '../entities/Conversation'
import { User } from '../entities/User'
import { UserToConversation } from '../entities/junctions/UserToConversation'
import { In } from 'typeorm'
import { Message } from '../entities/Message'
import { getUserConversation } from '../services/auth.service'

export const createConversation = async (req: Request, res: Response) => {
  try {
    const conversation = Conversation.create(req.validated)
    await conversation.save()

    const users = await User.find({
      where: {
        id: In(req.validated.members)
      }
    })

    // linking members
    await Promise.all(
      users.map((user) => {
        const userConversation = UserToConversation.create()
        userConversation.conversation = conversation
        userConversation.user = user
        return userConversation.save()
      })
    )

    res.sendSuccess({ data: conversation, message: 'Conversation created successfully' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const getConversations = async (req: Request, res: Response) => {
  try {
    const conversations = await getUserConversation(req.authUser, true, false)
    res.sendSuccess({ data: conversations, message: 'Conversations fetched successfully' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const getMessages = async (req: Request, res: Response) => {
  try {
    // TODO: Implement skip an take logic here
    const messages = await Message.findAndCount({
      where: {
        conversation: {
          id: parseInt(req.params.conversation_id)
        }
      },
      order: {
        created_at: 'DESC'
      },
      relations: {
        sender: true
      }
    })

    res.sendSuccess({ data: messages[0], message: 'Messages fetched successfully' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const createMessage = async (req: Request, res: Response) => {
  try {
    const message = Message.create()
    const conversation = Conversation.create()
    conversation.id = req.validated.conversation_id
    message.conversation = conversation

    const sender = User.create()
    sender.id = req.validated.sender_id
    message.sender = sender

    message.message = req.validated.message

    await message.save()

    res.sendSuccess({ data: message, message: 'Message created successfully' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const updateMessage = async (req: Request, res: Response) => {
  try {
    await Message.update(req.params.message_id, req.validated)

    res.sendSuccess({ message: 'Message updated successfully' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}
