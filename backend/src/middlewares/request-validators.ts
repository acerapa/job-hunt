import { NextFunction, Request, Response } from "express";
// import { ObjectSchema } from "joi";
import type { ZodSchema } from "@shared/pack";
import { formatResponse } from "../helpers/response";

// export const validateBody = <Schema extends ObjectSchema>(schema: Schema) => {
export const validateBody = <Schema extends ZodSchema>(schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // const { value, error } = schema.validate(req.body);
    const { value, error } = schema.parse(req.body)
    if (error) {
      res.status(400).json(formatResponse(error, "Validation errors!", 400));
    } else {
      req.body.validated = value;
      next();
    }
  };
};
