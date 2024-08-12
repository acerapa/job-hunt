import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { formatResponse } from "../helpers/response";
import { User } from "../entities/User";
import { User as UserTyping } from "@shared/pack";
import { instanceToInstance } from "class-transformer";
import { UserRegistration } from "../entities/UserRegistration";
import { Address } from "../entities/Address";
import { generateAccessAndRefreshToken } from "../services/auth-service";

export const all = async (req: Request, res: Response) => {
  try {
    const users = instanceToInstance(
      await User.find({
        order: {
          created_at: "DESC",
        },
        relations: {
          user_registration: true,
          company_rep: true,
        },
      })
    );

    res
      .status(200)
      .json(formatResponse({ users }, "Successfully fetched!", 200));
  } catch (e) {
    res.status(400).json(formatResponse(e, "Something wen't wrong!", 400));
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = password ? await hash(password, 10) : "";

    const user = User.create({
      email,
      username,
      password: hashedPassword,
    });

    await user.save();

    const userRegistration = UserRegistration.create({
      done_type: false,
      is_completed: false,
      user: user,
    });

    userRegistration.save();

    // login user
    const tokens = generateAccessAndRefreshToken(user);

    res
      .status(200)
      .json(
        formatResponse(
          { user_id: user.id, ...tokens },
          "Successfully created!",
          200
        )
      );
  } catch (e) {
    const { name, message } = e as Error;
    res
      .status(400)
      .json(formatResponse({ name, message }, "Something wen't wrong!", 400));
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const validated = req.body.validated;
    if (validated && validated.user) {
      const user = await User.findOne({
        where: { id: Number.parseInt(req.params.id) },
        relations: {
          address: true,
          user_registration: true,
        },
      });

      if (!user) {
        throw Error("No user found!");
      }

      if (validated.address) {
        if (user.address) {
          Object.assign(user.address, validated.address);
          await user.address.save();
        } else {
          const address = await Address.create(validated.address);
          await address.save();
          validated.user.address = address;
        }
      }

      Object.assign(user, validated.user);
      await user.save();

      if (validated.user_registration) {
        Object.assign(user.user_registration, validated.user_registration);
        await user.user_registration.save();
      }
    } else {
      throw Error("No data pass to update!");
    }

    res.status(200).json(formatResponse({}, "Successfully updated!", 200));
  } catch (e) {
    const { message, stack, name } = e as Error;
    res
      .status(400)
      .json(
        formatResponse(
          { name, message, stack },
          "Something wen't wrong => " + message,
          400
        )
      );
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const user: UserTyping | null = instanceToInstance(
      await User.findOne({
        where: { id: Number.parseInt(req.params.id) },
        relations: {
          user_registration: true,
          company_rep: true,
        },
      })
    );

    res
      .status(200)
      .json(formatResponse({ user }, "Successfully fetched!", 200));
  } catch (e) {
    res.status(400).json(formatResponse(e, "Something wen't wrong", 400));
  }
};
