import { Request, Response } from "express";
import { FindOptionsWhere } from "typeorm";
import { compare } from "bcryptjs";
import { formatResponse } from "../helpers/response";
import { isEmail } from "@shared/pack/dist";
import { User } from './../entities/User';
import { generateAccessAndRefreshToken } from "../services/auth-service";
import { JwtPayload, verify } from "jsonwebtoken";
import { getEnvOrDefault } from "../helpers/env-helpers";
import { LoginResponseData } from "@shared/pack"

export const authenticate = async (req: Request, res: Response) => {
  const { usercred, password } = req.body;

  const condition: Partial<FindOptionsWhere<User>> = {};

  // verify if the parameter is an email or not
  isEmail(usercred)
    ? (condition.email = usercred)
    : (condition.username = usercred);

  const user = await User.findOne({
    where: condition,
    select: ['password','id']
  });


  let responseData: LoginResponseData = {
    authenticated: false,
    access: "",
    refresh: ""
  };

  if (user) {
    const isMatched = await compare(password, user.password);
    if (isMatched) {
      // generate tokens
      responseData = {
        authenticated: true,
        ...generateAccessAndRefreshToken(user)
      };

      return res
        .status(200)
        .json(
          formatResponse(
            responseData,
            "Successfully login",
            200
          )
        );
    }
  }

  res
    .status(401)
    .json(formatResponse(responseData, "Invalid credentials", 401));
};

export const refresh = async (req: Request, res: Response) => {
  try {
    let data: JwtPayload | string = verify(
      req.body.refresh,
      getEnvOrDefault("REFRESH_TOKEN_KEY", "thisisasecretforrefresh")
    );

    data = data as JwtPayload;
    if (data && data.refresh) {
      const user = await User.findOne({ where: { id: data.user_id } });
      if (user) {
        res
          .status(200)
          .json(
            formatResponse(
              { ...generateAccessAndRefreshToken(user) },
              "Successfully refresh tokens!",
              200
            )
          );
      } else throw new Error("Invalid token!");
    }
  } catch (error) {
    res.status(401).json(formatResponse(error, "Invalid token!", 401));
  }
};
