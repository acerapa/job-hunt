import { Request, Response } from 'express'
import { Application } from '../entities/Application'
import { Job } from '../entities/Job'

export const createApplication = async (req: Request, res: Response) => {
  try {
    const validated = req.validated
    const application = Application.create(validated)
    application.job = Job.create({ id: validated.job_id })
    application.profile = Job.create({ id: validated.profile_id })
    await application.save()

    res.sendSuccess({ message: 'Application created successfully!' })
  } catch (error) {
    const { name, message, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}
