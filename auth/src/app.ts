import express, { json } from "express";
import { usersRouter } from "./routes/api/users";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { configDotenv } from "dotenv";
import "express-async-errors";
import cookieSession from "cookie-session";

configDotenv();

// Do not start the app if the JWT_KEY is not set in the container environment
if (!process.env.JWT_KEY) throw new Error("JWT_KEY not set");

const app = express();
app.use(json());

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use("/api/users", usersRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
