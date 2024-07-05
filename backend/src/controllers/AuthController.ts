import { Request, Response } from "express";
import { User } from "../entities/User";
import { FindOptionsWhere } from "typeorm";
import { compare } from "bcryptjs";
import { formatResponse } from "../helpers/response";
import { isEmail } from "../validators";

export const authenticate = async (req: Request, res: Response) => {
  const { usercred, password } = req.body;

  const condition: Partial<FindOptionsWhere<User>> = {};

  // verify if the parameter is an email or not
  isEmail(usercred)
    ? (condition.email = usercred)
    : (condition.username = usercred);

  const user = await User.findOne({
    where: condition,
  });

  if (user) {
    const isMatched = await compare(password, user.password);
    if (isMatched) {
      res
        .status(200)
        .json(
          formatResponse({ authenticated: true }, "Successfully login", 200)
        );
    } else {
      res
        .status(401)
        .json(
          formatResponse({ authenticated: false }, "Invalid credentials", 401)
        );
    }
  }
};
