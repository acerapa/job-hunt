import { Request, Response } from 'express'
import { hash } from 'bcryptjs'
import { formatResponse } from '../middlewares/response'
import { User } from '../entities/User'
import { User as UserTyping } from '@shared/pack'
import { instanceToInstance } from 'class-transformer'
import { Address } from '../entities/Address'
import { generateAccessAndRefreshToken } from '../services/auth-service'
import { Profile } from '../entities/Profile'

export const all = async (req: Request, res: Response) => {
  try {
    const users = instanceToInstance(
      await User.find({
        order: {
          created_at: 'DESC'
        }
      })
    )

    res.status(200).json(formatResponse({ users }, 'Successfully fetched!', 200))
  } catch (e) {
    res.status(400).json(formatResponse(e, "Something wen't wrong!", 400))
  }
}

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body
  try {
    const user = User.create({
      email,
      username,
      password
    })

    await user.save()

    const profile = new Profile()
    profile.user = user
    await profile.save()

    res.sendSuccess({ message: 'Successfully created!' })
  } catch (e) {
    const { name, message } = e as Error
    res.sendError({ message: `${name} ${message}` })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const validated = req.validated
    if (validated) {
      await User.update(req.params.id, validated)
    } else {
      throw Error('No data pass to update!')
    }

    res.sendSuccess({ message: 'Successfully updated!' })
  } catch (e) {
    const { message, stack, name } = e as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const user: Object | null = null

    res.status(200).json(formatResponse({ user }, 'Successfully fetched!', 200))
  } catch (e) {
    res.status(400).json(formatResponse(e, "Something wen't wrong", 400))
  }
}
