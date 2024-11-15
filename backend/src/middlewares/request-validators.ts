import { NextFunction, Request, Response } from 'express'
import { ZodSchema, ZodError } from '@shared/pack'

export const validateBody = <Schema extends ZodSchema>(schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body)
      req.validated = result
      next()
    } catch (e) {
      const { errors } = e as ZodError
      res.sendError({ message: 'Validation errors!', data: errors })
    }
  }
}
