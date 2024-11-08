import { ShorthandResponseArgs } from '../middlewares/response'
import * as express from 'express'

declare global {
  namespace Express {
    interface Response {
      /**
       * This function generally sends success response to the client
       * NOTE: To be clear function is yet to be supplied
       */
      sendSuccess: <Data = any>(args?: ShorthandResponseArgs<Data>) => Response

      /**
       * This function generally sends error response to the client
       * NOTE: To be clear function is yet to be supplied
       */
      sendError: <Data = any>(args?: ShorthandResponseArgs<Data>) => Response
    }

    interface Request {
      validated: any
      authUser: number
    }
  }
}
