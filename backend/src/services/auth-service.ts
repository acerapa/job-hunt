import { sign } from "jsonwebtoken";
import { User } from "../entities/User";
import { getEnvOrDefault } from "../helpers/env-helpers";

export const generateAccessAndRefreshToken = (user: User) => {
  const accessToken = sign(
    { user_id: user.id, refresh: false },
    getEnvOrDefault("SECRET_KEY", "thisisasecret"),
    { expiresIn: getEnvOrDefault("TOKEN_EXP", "15m") }
  );

  const refreshToken = sign(
    { user_id: user.id, refresh: true },
    getEnvOrDefault("REFRESH_TOKEN_KEY", "thisisasecretforrefresh"),
    { expiresIn: getEnvOrDefault("REFRESH_TOKEN_EXP", "1d") }
  );

  return {
    token: accessToken,
    refresh: refreshToken,
  };
};
