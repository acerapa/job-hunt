import { ApiResponse } from '@shared/pack'
import { NextFunction, Request, Response } from 'express'

export interface ShorthandResponseArgs<Data = any> {
  data?: Data
  message?: string
  status?: number
}

export const formatResponse = <Data>(
  data: Data,
  message: string = 'Success',
  status: number = 200
): ApiResponse<Data> => {
  return {
    data,
    message,
    status
  }
}

/**
 * This function will supply this methods: sendSuccess, sendError
 * with there corresponding logics and responses
 *
 * @returns Function
 */
export const shorthandResponse = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.sendSuccess = <Data = any>(args?: ShorthandResponseArgs) => {
      let presets = {
        data: {},
        message: 'Success',
        status: 200
      }

      presets = args && Object.keys(args).length ? { ...presets, ...args } : presets

      return res
        .status(presets.status)
        .json(<Data>formatResponse(presets.data, presets.message, presets.status))
    }

    res.sendError = <Data = any>(args?: ShorthandResponseArgs) => {
      let presets = {
        data: {},
        message: 'Something went wrong!',
        status: 400
      }

      presets = args && Object.keys(args).length ? { ...presets, ...args } : presets

      return res
        .status(presets.status)
        .json(<Data>formatResponse(presets.data, presets.message, presets.status))
    }

    return next()
  }
}
