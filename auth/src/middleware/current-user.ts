import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserPayload } from "../interfaces/user";

// Augment the type definition for the Request interface to include
// the optional currentUser object whose interface is IUserPayload
declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

/**
 * Set the currentUser inside the req object
 * @param req
 * @param res
 * @param next
 * @returns
 */
export function currentUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session?.jwt) {
    // If the session or jwt within the session is not set,
    // continue without setting the currentUser in the req
    return next();
  }

  try {
    // jwt is set within the session object
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as IUserPayload;

    // If it is valid, set the contents within the request object as currentUser
    req.currentUser = payload;
  } catch (err) {
    console.error("Error verifying the JWT", err);
  }

  // Carry on
  next();
}
