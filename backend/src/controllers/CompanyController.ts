import { Request, Response } from 'express'
import { Company } from '../entities/Company'
import { User } from '../entities/User'

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
      const company = Company.create(req.validated)
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
        id: parseInt(req.params.id),
        user: {
          id: parseInt(req.params.user_id)
        }
      },
      req.validated
    )
  } catch (error) {}
}
