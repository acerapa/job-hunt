import { NextFunction, Request, Response } from 'express'
import { ZodSchema, ZodError } from '@shared/pack'

export const validateBody = <Schema extends ZodSchema>(
  schema: Schema,
  evaluateTypes: boolean = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = { ...req.body }

      console.log(data)
      // validate types
      if (evaluateTypes) {
        Object.keys(data).forEach((key) => {
          if (typeof data[key] === 'string') {
            // check if string is boolean via regex
            if (data[key].search(/^(true|false)$/) !== -1) {
              data[key] = JSON.parse(data[key])
            }
            // check if string is numeric
            else if (data[key].search(/^\-?\d+(\.\d+)?$/) !== -1) {
              data[key] = JSON.parse(data[key])
            }
          }
        })
      }

      const result = schema.parse(data)
      req.validated = result
      next()
    } catch (e) {
      const { errors } = e as ZodError
      res.sendError({ message: 'Validation errors!', data: errors })
    }
  }
}
