import { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { User } from "../../database/models/User";
import { Password } from "../../services/password";
import jwt from "jsonwebtoken";
import "express-async-errors";

export async function signup(req: Request, res: Response) {
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
  const { email, password } = req.body;

  // Check if the email exists, and if the password matches the hash in the database
  const user = await User.findOne({ email });

  if (!user || !Password.compare(password, user.password)) {
    throw new BadRequestError("Invalid credentials");
  }

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

  res.status(200).send({ success: true, user });
}

export function currentUser(req: Request, res: Response) {
  res
    .status(req.currentUser ? 200 : 401)
    .send({ currentUser: req.currentUser || null });
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await User.find();

  res.status(200).send(users);
}

export function signout(req: Request, res: Response) {
  req.session = null;

  res.status(205).send({});
}
