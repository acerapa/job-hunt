import { Request, Response } from 'express'
import { Company } from '../entities/Company'
import { type Job as IJob } from '@shared/pack'
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

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs: IJob[] = await Job.find({
      where: {
        company: {
          id: parseInt(req.params.company_id)
        }
      }
    })

    res.sendSuccess({ data: jobs, message: 'Jobs fetched successfully!' })
  } catch (error) {
    const { name, message, stack } = error as Error
    console.log(stack)
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find({
      relations: {
        company: true
      }
    })

    res.sendSuccess({ data: jobs, message: 'all jobs' })
  } catch (error) {
    const { name, message, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}
