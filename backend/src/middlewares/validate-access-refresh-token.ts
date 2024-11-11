import { NextFunction, Request, Response } from 'express'
import { verify, JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'
import { getEnv } from '../helpers/env-helpers'
import { generateAccessAndRefreshToken } from '../services/auth-service'
import { setCookie } from '../helpers/set-cookies'

export const validateAccessRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const { access, refresh } = req.signedCookies
  const secret = getEnv('SECRET_KEY', '')
  const refreshSecret = getEnv('REFRESH_TOKEN_KEY', '')

  let payload: JwtPayload | null

  try {
    payload = verify(access, secret) as JwtPayload
    req.authUser = payload?.user_id
  } catch (error) {
    if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
      try {
        payload = verify(refresh, refreshSecret) as JwtPayload
        const tokens = generateAccessAndRefreshToken({ id: payload?.user_id })

        setCookie(res, 'access', tokens.access)
        setCookie(res, 'refresh', tokens.refresh, { maxAge: 2 * 24 * 60 * 60 * 1000 })

        req.authUser = payload?.user_id
      } catch (error) {
        return res.sendError({ message: 'Unauthorized', status: 401 })
      }
    } else {
      return res.sendError({ message: 'Unauthorized', status: 401 })
    }
  }

  next()
}
