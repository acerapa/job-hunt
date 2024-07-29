import { Request, Response } from 'express';
import { Company } from '../entities/Company';
import { Company as CompanyTyping } from '@shared/pack/dist';
import { instanceToPlain } from 'class-transformer';
import { formatResponse } from '../helpers/response';

export const all = async (req: Request, res: Response) => {
  try {
    const companies: CompanyTyping [] = instanceToPlain(
      await Company.find({
        order: {
          created_at: 'DESC'
        },
        relations: {
          reps: true,
          jobs: true
        }
      })
    ) as CompanyTyping[]
    res
      .status(200)
      .json(
        formatResponse({companies}, "Successfully fetched!", 200)
      )
  } catch (error) {
    res
      .status(400)
      .json(
        formatResponse(error, "Something wen't wrong!", 400)
      )
  }
}
