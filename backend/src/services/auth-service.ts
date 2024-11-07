import { sign } from 'jsonwebtoken'
import { User } from '../entities/User'
import { getEnv } from '../helpers/env-helpers'

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
