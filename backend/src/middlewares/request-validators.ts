import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { formatResponse } from "../helpers/response";

export const validateBody = <Schema extends ObjectSchema>(schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      res.status(400).json(formatResponse(error, "Validation errors!", 400));
    } else {
      req.body.validated = value;
      next();
    }
  };
};
