import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
const multerInstance = multer({ storage: multer.memoryStorage() })

export const createFile = async (req: Request, res: Response, next: NextFunction) => {
  const uploadFiles = multerInstance.array('files')
  uploadFiles(req, res, async (err) => {
    if (err) {
      const { name, message, stack } = err as Error
      res.sendError({ message: `${name} ${message} ${stack}` })
      return
    }

    next()
  })
}
