import { Request, Response } from 'express'
import { FindOptionsWhere } from 'typeorm'
import { compare } from 'bcryptjs'
import { formatResponse } from '../helpers/response'
import { isEmail } from '@shared/pack/dist'
import { User } from './../entities/User'
import { type User as IUser } from '@shared/pack'
import { generateAccessAndRefreshToken } from '../services/auth-service'
import { setCookie } from '../helpers/set-cookies'

export const authenticate = async (req: Request, res: Response) => {
  const { usercred, password } = req.body

  const condition: Partial<FindOptionsWhere<User>> = {}

  // verify if the parameter is an email or not
  isEmail(usercred) ? (condition.email = usercred) : (condition.username = usercred)

  const user = await User.findOne({
    where: condition
  })

  if (user) {
    const isMatched = await compare(password, user.getPassword())
    if (isMatched) {
      const { refresh, access } = generateAccessAndRefreshToken(user)

      // set cookies and token
      setCookie(res, 'access', access)
      setCookie(res, 'refresh', refresh, { maxAge: 2 * 24 * 60 * 60 * 1000 })

      return res.status(200).json(formatResponse({}, 'Successfully login', 200))
    }
  }

  res.status(401).json(formatResponse({}, 'Invalid credentials', 401))
}

export const signOut = async (req: Request, res: Response) => {
  res.clearCookie('access', { path: '/api' })
  res.clearCookie('refresh', { path: '/api' })

  res.status(200).json(formatResponse({}, 'Successfully sign out!', 200))
}

export const authUser = async (req: Request, res: Response) => {
  const user: IUser | null = await User.findOne({
    where: {
      id: req.body.auth_user
    }
  })

  res.status(200).json(formatResponse(user))
}
