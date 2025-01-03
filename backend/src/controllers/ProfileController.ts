import { Request, Response } from 'express'
import { Profile } from '../entities/Profile'
import { Address } from '../entities/Address'
import { Skill } from '../entities/Skill'
import { ProfileToSkill } from '../entities/junctions/ProfileToSkill'

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
      const currentProfileSkills = (
        await ProfileToSkill.find({
          where: {
            profile: {
              id: profile.id
            }
          },
          relations: {
            skill: true
          }
        })
      ).map((profileToSkill) => profileToSkill.skill.id)

      const newSkills = req.validated.skills.filter((skill: number) => {
        return !currentProfileSkills.includes(skill)
      })

      const skillsToRemove = currentProfileSkills.filter((skill: number) => {
        return !req.validated.skills.includes(skill)
      })

      await Promise.all([
        ...newSkills.map((skill: number) => {
          const profileToSkill = ProfileToSkill.create({
            profile,
            skill: { id: skill }
          })

          return profileToSkill.save()
        }),
        ...skillsToRemove.map((skill: number) => {
          return ProfileToSkill.delete({
            profile: { id: profile.id },
            skill: { id: skill }
          })
        })
      ])
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
