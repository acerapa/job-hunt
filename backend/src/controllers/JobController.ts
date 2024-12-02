import { Request, Response } from 'express'
import { Company } from '../entities/Company'
import { type Job as IJob } from '@shared/pack'
import { Job } from '../entities/Job'
import { Address } from '../entities/Address'
import { Question } from '../entities/Question'
import { JobToShift } from '../entities/junctions/JobToShift'
import { Shift } from '../entities/Shift'
import { In } from 'typeorm'

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

    let address = null
    if (validated.address_id) {
      address = await Address.findOne({
        where: {
          id: validated.address_id
        }
      })
    }

    if (!company) {
      return res.sendError({ message: 'Company not found!', status: 404 })
    }

    // questions creations
    let questions = []
    if (validated.questions) {
      questions = Question.create(validated.questions)
      await Question.save(questions)
    }

    // create job
    const job = await Job.create(validated)
    job.company = company
    if (address) job.address = address
    if (questions.length) job.questions = questions

    await job.save()

    // linking shifts
    if (validated.shifts) {
      const fetchedShifts = await Shift.find({
        where: {
          id: In(validated.shifts)
        }
      })

      await Promise.all(
        fetchedShifts.map((shift) => {
          const jobToShift = JobToShift.create()
          jobToShift.job = job
          jobToShift.shift = shift

          return jobToShift.save()
        })
      )
    }

    res.sendSuccess({ message: 'Job created successfully!' })
  } catch (error) {
    const { name, message } = error as Error
    res.sendError({ message: `${name} ${message}` })
  }
}

export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = Job.create(req.validated)
    job.id = parseInt(req.params.id)
    await job.save()

    res.sendSuccess({ message: 'Job updated successfully!' })
  } catch (error) {
    const { name, message, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find({
      where: {
        company: {
          id: parseInt(req.params.company_id)
        }
      },
      relations: {
        applications: true,
        job_shifts: {
          shift: true
        }
      }
    })

    res.sendSuccess({ data: jobs, message: 'Jobs fetched successfully!' })
  } catch (error) {
    const { name, message, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find({
      relations: {
        company: true,
        applications: true
      }
    })

    res.sendSuccess({ data: jobs, message: 'all jobs' })
  } catch (error) {
    const { name, message, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findOne({
      where: {
        id: parseInt(req.params.job_id)
      },
      relations: {
        company: {
          address: true
        },
        questions: true,
        job_shifts: {
          shift: true
        }
      }
    })

    res.sendSuccess({ data: job, message: 'Job fetched successfully!' })
  } catch (error) {
    const { name, message, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}
