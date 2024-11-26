import { Request, Response } from 'express'
import { Company } from '../entities/Company'
import { Job } from '../entities/Job'

export const createJob = async (req: Request, res: Response) => {
  try {
    const { company_id } = req.params
    const validated = req.validated

    // get company
    const company = await Company.findOne({
      where: {
        id: parseInt(company_id)
      }
    })

    if (!company) {
      return res.sendError({ message: 'Company not found!', status: 404 })
    }

    // create job
    const job = await Job.create(validated)
    job.company = company
    await job.save()

    res.sendSuccess({ message: 'Job created successfully!' })
  } catch (error) {
    const { name, message } = error as Error
    res.sendError({ message: `${name} ${message}` })
  }
}
