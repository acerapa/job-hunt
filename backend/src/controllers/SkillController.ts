import { Request, Response } from 'express'
import { Skill } from '../entities/Skill'

export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find()

    res.sendSuccess({ data: skills, message: 'Successfully fetched skills' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = Skill.create(req.validated)
    await skill.save()

    res.sendSuccess({ message: 'Successfully created skill' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}
