import { Request, Response } from 'express'
import { Profile } from '../entities/Profile'
import { User } from '../entities/User'

export const createProfile = async (req: Request, res: Response) => {
  try {
    const data = req.validated
    const user = await User.findOne({
      where: { id: data.user_id },
      relations: {
        profile: true
      }
    })

    // res.sendSuccess({ data: profile })
  } catch (error) {
    res.sendError({ message: (error as Error).message })
  }
}
