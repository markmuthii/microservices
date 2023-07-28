import express from "express";
import {
  currentUser,
  getAllUsers,
  signin,
  signout,
  signup,
} from "../../controllers/api/users";

import {
  signInValidation,
  signupValidation,
  validateRequestMiddleware,
} from "../../middleware/validate-request";
import { currentUserMiddleware } from "../../middleware/current-user";
import { requireAuthMiddleware } from "../../middleware/require-auth";

const router = express.Router();

router.post("/signup", signupValidation, validateRequestMiddleware, signup);

router.post("/signin", signInValidation, validateRequestMiddleware, signin);

router.get("/currentuser", currentUserMiddleware, currentUser);

router.get("/", currentUserMiddleware, requireAuthMiddleware, getAllUsers);

router.post("/signout", signout);

export { router as usersRouter };
