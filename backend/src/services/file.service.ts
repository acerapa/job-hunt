import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import { File } from '../entities/File'
const multerInstance = multer({ storage: multer.memoryStorage() })

export const createFile = async (req: Request, res: Response, next: NextFunction) => {
  const uploadFiles = multerInstance.array('files')
  uploadFiles(req, res, async (err) => {
    if (err) {
      const { name, message, stack } = err as Error
      res.sendError({ message: `${name} ${message} ${stack}` })
      return
    }

    if (req.files && req.files?.length) {
      // save files here
      const files = (req.files as Express.Multer.File[]).map((file) => {
        const f = File.create({
          file: file.buffer,
          name: file.originalname,
          type: file.mimetype,
          size: file.size
        })

        return f
      })

      req.body.files = (await File.save(files)).map((f) => f.id)
    }

    next()
  })
}
