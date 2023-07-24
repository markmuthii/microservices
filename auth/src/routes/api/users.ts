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
} from "../../middleware/validation";

const router = express.Router();

router.post("/signup", signupValidation, signup);

router.post("/signin", signInValidation, signin);

router.get("/currentuser", currentUser);

router.get("/", getAllUsers);

router.post("/signout", signout);

export { router as usersRouter };
