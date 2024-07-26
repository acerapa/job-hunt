import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "@shared/pack";
import { formatResponse } from "../helpers/response";

export const validateBody = <Schema extends ZodSchema>(schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body)
      req.body.validated = result
      next()
    } catch (e) {
      const { errors } = (e as ZodError)
      res.status(400).json(formatResponse(errors, "Validation errors!", 400))
    }
  };
};
