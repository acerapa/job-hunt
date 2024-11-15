import { Request, Response } from 'express'
import { FindOptionsWhere } from 'typeorm'
import { compare } from 'bcryptjs'
import { formatResponse } from '../middlewares/response'
import { isEmail } from '@shared/pack/dist'
import { User } from './../entities/User'
import { type User as IUser, type Profile as IProfile } from '@shared/pack'
import { generateAccessAndRefreshToken } from '../services/auth-service'
import { setCookie } from '../helpers/set-cookies'
import { instanceToInstance } from 'class-transformer'

export const authenticate = async (req: Request, res: Response) => {
  try {
    const { usercred, password } = req.body
    const condition: Partial<FindOptionsWhere<User>> = {}

    // verify if the parameter is an email or not
    isEmail(usercred) ? (condition.email = usercred) : (condition.username = usercred)
    const user = await User.findOne({
      where: condition
    })

    if (user) {
      const isMatched = await compare(password, user.password)
      if (isMatched) {
        const { refresh, access } = generateAccessAndRefreshToken(user)

        // set cookies and token
        req.authUser = user.id
        setCookie(res, 'access', access)
        setCookie(res, 'refresh', refresh, { maxAge: 2 * 24 * 60 * 60 * 1000 })

        return res.sendSuccess({ message: 'Successfully login' })
      }
    }

    res.sendError({ message: 'Invalid credentials', status: 401 })
  } catch (error) {
    res.sendError()
  }
}

export const signOut = async (req: Request, res: Response) => {
  res.clearCookie('access', { path: '/api' })
  res.clearCookie('refresh', { path: '/api' })

  // reset auth user in request
  req.authUser = 0

  res.status(200).json(formatResponse({}, 'Successfully sign out!', 200))
}

export const authUser = async (req: Request, res: Response) => {
  try {
    const user: IUser<IProfile> | null = instanceToInstance(
      await User.findOne({
        where: {
          id: req.authUser
        },
        relations: {
          profile: {
            address: true
          },
          company: true
        }
      })
    )

    res.sendSuccess({ data: user, message: 'Successfully retrieved' })
  } catch (error) {
    const { name, message, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}
