import { Request, Response } from 'express';
import { Company } from '../entities/Company';
import { Company as CompanyTyping } from '@shared/pack/dist';
import { instanceToPlain } from 'class-transformer';
import { formatResponse } from '../helpers/response';
import { Address } from '../entities/Address';
import { CompanyRep } from '../entities/CompanyRep';

export const all = async (req: Request, res: Response) => {
  try {
    const companies: CompanyTyping [] = instanceToPlain(
      await Company.find({
        order: {
          created_at: 'DESC'
        },
        relations: {
          rep: true,
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

export const register = async (req: Request, res: Response) => {
  try {
    const data = req.body.validated

    const address = Address.create(data.address)
    await address.save()

    const company = Company.create({
      ...data.company,
      address_id: address.id
    })
    await company.save()

    const companyRep = CompanyRep.create({
      ...data.rep,
      company_id: company.id
    })
    await companyRep.save()

    res
      .status(200)
      .json(
        formatResponse({}, "Successfully Created!", 200)
      )
  } catch (error) {
    res
      .status(400)
      .json(
        formatResponse(error, "Something wen't wrong!", 400)
      )
  }
}
