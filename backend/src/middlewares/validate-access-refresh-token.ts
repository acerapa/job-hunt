import { NextFunction, Request, Response } from 'express'
import { verify, decode, JwtPayload } from 'jsonwebtoken'
import { getEnv } from '../helpers/env-helpers'
import { formatResponse } from '../helpers/response'
import { generateAccessAndRefreshToken } from '../services/auth-service'
import { setCookie } from '../helpers/set-cookies'

export const validateAccessRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const { access, refresh } = req.signedCookies
  const secret = getEnv('SECRET_KEY', '')
  const refreshSecret = getEnv('REFRESH_TOKEN_KEY', '')

  let payload: JwtPayload | null

  if (access && verify(access, secret)) {
    payload = decode(access, { json: true, complete: false })
  } else if (refresh && verify(refresh, refreshSecret)) {
    payload = decode(refresh, { json: true, complete: false })
    const tokens = generateAccessAndRefreshToken({ id: payload?.user_id })

    // set new cookies
    setCookie(res, 'access', tokens.access)
    setCookie(res, 'refresh', tokens.refresh, { maxAge: 2 * 24 * 60 * 60 * 1000 })
  } else {
    return res.status(401).json(formatResponse({}, 'Unauthorized', 401))
  }

  // set payload to request body
  req.body.auth_user = payload?.user_id
  next()
}
