import { Request, Response } from 'express'
import { Profile } from '../entities/Profile'
import { Address } from '../entities/Address'
import { Skill } from '../entities/Skill'

export const updateProfile = async (req: Request, res: Response) => {
  try {
    await Profile.update(req.params.id, req.validated)

    res.sendSuccess({ message: 'Successfully updated profile' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const updateSkills = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      where: {
        id: parseInt(req.params.id)
      }
    })

    if (profile) {
      const skills = req.validated.skills
      profile.skills = skills.map((skill: number) => Skill.create({ id: skill }))
    }

    res.sendSuccess({ message: 'Successfully updated profile' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const updateCreateProfileAddress = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      where: {
        id: parseInt(req.params.id)
      },
      relations: {
        address: true
      }
    })

    if (profile) {
      if (profile.address) {
        await Address.update(profile.address.id, req.validated)
      } else {
        const address = Address.create(req.validated)
        await address.save()
        profile.address = address
        await profile.save()
      }
    }

    res.sendSuccess({ message: 'Successfully updated address' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      where: {
        id: parseInt(req.params.id)
      },
      relations: {
        address: true,
        applications: {
          job: {
            company: true
          }
        }
      }
    })
    res.sendSuccess({ data: profile, message: 'Successfully retrieved profile' })
  } catch (error) {
    const { message, name, stack } = error as Error
    res.sendError({ message: `${name} ${message} ${stack}` })
  }
}
