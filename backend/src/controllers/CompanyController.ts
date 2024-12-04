import { Request, Response } from 'express'
import { Company } from '../entities/Company'
import { User } from '../entities/User'
import { Address } from '../entities/Address'
import { Shift } from '../entities/Shift'
import { Industry } from '../entities/Industry'

export const register = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.params.user_id)
      },
      relations: {
        company: true
      }
    })

    if (user) {
      // create address
      const address = Address.create(req.validated.address)
      await address.save()

      const company = Company.create(req.validated.company)
      company.address = address
      await company.save()

      user.company = company
      await user.save()
    }

    res.sendSuccess({ message: 'Successfully registered!' })
  } catch (error) {
    const { name, message } = error as Error

    res.sendError({ message: `${name}: ${message}` })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    await Company.update(
      {
        id: parseInt(req.params.id)
      },
      req.validated
    )

    res.sendSuccess({ message: 'Successfully updated!' })
  } catch (error) {
    const { name, message } = error as Error
    res.sendError({ message: `${name}: ${message}` })
  }
}

export const updateCreateCompanyAddress = async (req: Request, res: Response) => {
  try {
    const company = await Company.findOne({
      where: {
        id: parseInt(req.params.id)
      },
      relations: {
        address: true
      }
    })

    if (company) {
      if (company.address) {
        await Address.update(company.address.id, req.validated)
      } else {
        const address = Address.create(req.validated)
        await address.save()
        company.address = address
        await company.save()
      }
    } else {
      throw new Error('Company not found')
    }

    res.sendSuccess({ message: 'Successfully updated address' })
  } catch (error) {
    const { name, message } = error as Error
    res.sendError({ message: `${name}: ${message}` })
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findOneOrFail({
      where: {
        id: parseInt(req.params.id)
      },
      relations: {
        jobs: true,
        user: true,
        industry: true
      }
    })

    res.sendSuccess({ data: company, message: 'Successfully fetched' })
  } catch (error) {
    const { name, message } = error as Error
    res.sendError({ message: `${name}: ${message}` })
  }
}

// shifts related
export const registerShift = async (req: Request, res: Response) => {
  try {
    const company = await Company.findOneOrFail({
      where: {
        id: parseInt(req.params.id)
      }
    })

    if (company) {
      const shift = Shift.create(req.validated)
      shift.company = company
      await shift.save()
    }

    res.sendSuccess({ message: 'Successfully registered shift' })
  } catch (error) {
    const { name, message } = error as Error
    res.sendError({ message: `${name}: ${message}` })
  }
}

// Industry
export const getIndustries = async (req: Request, res: Response) => {
  try {
    const industries = await Industry.find({
      relations: {
        companies: true
      }
    })
    res.sendSuccess({ data: industries, message: 'Successfully fetched industries' })
  } catch (error) {
    const { name, message, stack } = error as Error
    res.sendError({ message: `${name}: ${message} ${stack}` })
  }
}
