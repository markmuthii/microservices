import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err instanceof CustomError ? err.statusCode : 500).send({
    errors:
      err instanceof CustomError
        ? err.serializeErrors()
        : [{ message: err.message }],
  });
};
