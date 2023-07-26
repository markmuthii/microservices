import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const signupValidation = [
  body("email").trim().isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 4,
      max: 20,
    })
    .withMessage("Password must be between 4 and 20 characters"),
];

export const signInValidation = [
  body("email").trim().isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

export function validateRequestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
}
