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

export const updateShift = async (req: Request, res: Response) => {
  try {
    await Shift.update(req.params.id, req.validated)

    res.sendSuccess({ message: 'Successfully updated shift' })
  } catch (error) {
    const { name, message } = error as Error
    res.sendError({ message: `${name}: ${message}` })
  }
}

export const getShiftById = async (req: Request, res: Response) => {
  try {
    const shift = await Shift.findOneOrFail({
      where: {
        id: parseInt(req.params.id)
      }
    })

    res.sendSuccess({ data: shift, message: 'Shift retrieved successfully' })
  } catch (error) {
    const { name, message } = error as Error
    res.sendError({ message: `${name}: ${message}` })
  }
}
