import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../../errors/request-validation-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { User } from "../../database/models/User";
import "express-async-errors";
import { Password } from "../../services/password";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new BadRequestError("Email already exists");
  }

  let user = User.build({
    email,
    password,
  });

  await user.save();

  const userJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  req.session = {
    jwt: userJWT,
  };

  // This is not necessary after adding the toJSON in the User schema
  // const userData = (({ id, password, email }) => ({ id, email }))(user);

  // This could be a way to destructure the user object,
  // but it includes metadata from mongo,
  // so we are sticking to the above
  // const { __v, ...userData } = user;

  res.status(201).send({ success: true, user });
}

export async function signin(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;

  // Check if the email is valid
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  // Compare the passwords
  if (!Password.compare(password, user.password)) {
    throw new BadRequestError("Invalid credentials");
  }

  res.status(200).send({ message: "All good" });
}

export function currentUser(req: Request, res: Response) {
  res.send("Current user");
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await User.find();

  res.status(200).send(users);
}

export function signout(req: Request, res: Response) {
  res.send("Hi there!");
}
