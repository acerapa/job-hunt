import { Request, Response } from "express";
import { User } from "../entities/User";
import { hash } from "bcryptjs";
import { formatResponse } from "../helpers/response";

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

    res.status(200).json(formatResponse({}, "Successfully created!", 200));
  } catch (e) {
    const { name, message } = e as Error;
    res
      .status(400)
      .json(formatResponse({ name, message }, "Something wen't wrong!", 400));
  }
};
