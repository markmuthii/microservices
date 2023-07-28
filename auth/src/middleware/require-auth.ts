import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { User } from "../database/models/User";

export async function requireAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  const user = await User.findOne({ _id: req.currentUser.id });

  if (!user || user.status !== 1) {
    throw new NotAuthorizedError();
  }

  next();
}
