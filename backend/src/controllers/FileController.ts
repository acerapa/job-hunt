import { Request, Response } from 'express'
import { File } from '../entities/File'
import { User } from '../entities/User'
import AppDataSource from '../database'

export const serveFile = async (req: Request, res: Response) => {
  try {
    const file = await File.findOne({
      where: {
        id: parseInt(req.params.id)
      }
    })

    if (!file) {
      throw new Error('File not found')
    }

    res.setHeader('Content-Type', file.type)
    res.setHeader('Content-Length', file.size)
    res.setHeader('Content-Disposition', `inline; filename="${file.name}"`)

    res.send(file.file)
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}
