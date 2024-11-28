import { Request, Response } from 'express'
import { Shift } from '../entities/Shift'

export const getShifts = async (req: Request, res: Response) => {
  try {
    const shifts = await Shift.find({
      where: [
        {
          company: {
            id: parseInt(req.params.company_id)
          }
        },
        {
          is_default: true
        }
      ]
    })

    res.sendSuccess({ data: shifts, message: 'Shifts retrieved successfully' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name}: ${message} ${stack}` })
  }
}
