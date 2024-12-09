import { Request, Response } from 'express'
import { Conversation } from '../entities/Conversation'
import { User } from '../entities/User'
import { UserToConversation } from '../entities/junctions/UserToConversation'
import { In } from 'typeorm'

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
    const user = await User.findOneOrFail({
      where: {
        id: req.authUser
      },
      relations: {
        user_conversations: {
          conversation: {
            user_conversations: {
              user: true
            }
          }
        }
      }
    })

    res.sendSuccess({ data: user.conversations, message: 'Conversations fetched successfully' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const getConversation = async (req: Request, res: Response) => {
  // TODO: Implement conversation retrieval logic
}
export const updateConversation = async (req: Request, res: Response) => {
  // TODO: Implement conversation update logic
}
export const deleteConversation = async (req: Request, res: Response) => {
  // TODO: Implement conversation deletion logic
}
