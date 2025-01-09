import { sign } from 'jsonwebtoken'
import { User } from '../entities/User'
import { getEnv } from '../helpers/env-helpers'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { isEmail } from '@shared/pack/dist'
import { compare } from 'bcryptjs'
import AppDataSource, { checkConnection, initializeDataSource } from '../database'

type Param = {
  id: number
}

export const generateAccessAndRefreshToken = (user: User | Param) => {
  const accessToken = sign(
    { user_id: user.id, refresh: false },
    getEnv('SECRET_KEY', 'thisisasecret'),
    { expiresIn: getEnv('TOKEN_EXP', '15m') }
  )

  const refreshToken = sign(
    { user_id: user.id, refresh: true },
    getEnv('REFRESH_TOKEN_KEY', 'thisisasecretforrefresh'),
    { expiresIn: getEnv('REFRESH_TOKEN_EXP', '1d') }
  )

  return {
    access: accessToken,
    refresh: refreshToken
  }
}

export const getUserConversation = async (
  user_id: number,
  isIncludeMessages: boolean = false,
  shouldCheckConnection: boolean = true
) => {
  if (shouldCheckConnection) {
    let status = await checkConnection(AppDataSource)
    if (!status) {
      await initializeDataSource()
    }
  }

  const user = await User.findOneOrFail({
    where: {
      id: user_id
    },
    relations: {
      user_conversations: {
        conversation: {
          user_conversations: {
            user: true
          },
          messages: isIncludeMessages ? { sender: true, files: true } : isIncludeMessages
        }
      }
    },
    order: {
      user_conversations: {
        conversation: {
          messages: isIncludeMessages
            ? {
                created_at: 'DESC'
              }
            : undefined
        }
      }
    }
  })

  return user.conversations
}

export const authenticateUser = async (
  usercred: string,
  password: string,
  isIncludeRelations: boolean = false
): Promise<{ user: User | null; isMatched: boolean }> => {
  let isMatched = false
  const relations: Partial<FindOptionsRelations<User>> = {}
  const condition: Partial<FindOptionsWhere<User>> = {}

  if (isIncludeRelations) {
    relations.user_conversations = {
      conversation: true
    }
  }

  isEmail(usercred) ? (condition.email = usercred) : (condition.username = usercred)
  const user = await User.findOne({
    where: condition,
    relations: relations
  })

  if (user) {
    isMatched = await compare(password, user.password)
  }

  return {
    user,
    isMatched
  }
}
