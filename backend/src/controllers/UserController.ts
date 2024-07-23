import { Request, Response } from "express";
import { User } from "../entities/User";
import { hash } from "bcryptjs";
import { formatResponse } from "../helpers/response";
import { UserRegistration } from "../entities/UserRegistration";
import { User as TypeUser } from "@shared/pack";

export const all = async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      order: {
        created_at: 'DESC'
      },
      relations: {
        user_registration: true,
        company_rep: true,
      }
    });
    res
      .status(200)
      .json(
        formatResponse({users}, "Successfully fetched!", 200)
      )
  } catch (e) {
    res
      .status(400)
      .json(
        formatResponse(e, "Something wen't wrong!", 400)
      )
  }
}

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = password ? await hash(password, 10) : "";

    const user = User.create({
      email,
      username,
      password: hashedPassword,
    });

    await user.save()

    const userRegistration = UserRegistration.create({
      done_type: false,
      is_completed: false,
      user: user
    })

    userRegistration.save()

    res.status(200).json(formatResponse({id: user.id}, "Successfully created!", 200));
  } catch (e) {
    const { name, message } = e as Error;
    res
      .status(400)
      .json(formatResponse({ name, message }, "Something wen't wrong!", 400));
  }
};

export const update = async (req: Request, res: Response) => {
  const userData = {...req.body.user};
  delete userData.user_registration;
  const userRegistrationData = req.body.user.user_registration;

  try {
    await User.update({ id: req.body.user.id }, userData);
    await UserRegistration.update({ user_id: req.body.user }, userRegistrationData);
    res
      .status(200)
      .json(
        formatResponse({}, "Successfully updated!", 200)
      )
  } catch (e) {
    const { message, stack, name } = e as Error
    res.status(400).json(
      formatResponse({name, message, stack}, "Something wen't wrong => " + message, 400)
    )
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
        where: { id: Number.parseInt(req.params.id) },
        relations: {
        user_registration: true
      }
    })
    res
      .status(200)
      .json(
        formatResponse({user}, "Successfully fetched!", 200)
      )
  } catch (e) {
    res
      .status(400)
      .json(
        formatResponse(e, "Something wen't wrong", 400)
      )
  }
}
