import { Request, Response } from 'express'

export const createApplication = async (req: Request, res: Response) => {
  try {
    res.sendSuccess({ message: 'Application created successfully!' })
  } catch (error) {
    const { name, message, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}
