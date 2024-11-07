import { Response, CookieOptions } from 'express'

export const setCookie = (res: Response, name: string, value: string, options?: CookieOptions) => {
  let presetOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV == 'production',
    maxAge: 5 * 60 * 1000,
    priority: 'high',
    signed: true,
    path: '/api'
  }

  let opt: CookieOptions = { ...presetOptions }
  if (options && Object.keys(options).length) {
    opt = { ...presetOptions, ...options }
  }

  res.cookie(name, value, opt)
}
