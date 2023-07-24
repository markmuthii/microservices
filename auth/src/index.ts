import express, { json } from "express";
import { usersRouter } from "./routes/api/users";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { configDotenv } from "dotenv";
import { connectDatabase } from "./database/connect";
import "express-async-errors";
import cookieSession from "cookie-session";

configDotenv();

// Do not start the app if the JWT_KEY is not set in the container environment
if (!process.env.JWT_KEY) throw new Error("JWT_KEY not set");

// console.log(process.env.JWT_KEY);

// const obj = {
//   a: 12,
//   c: 2,
//   b: 54,
// };

// const obj2 = (({ a, c }) => ({ a, c }))(obj);

// function desObj({ a, c, b }: { a: any; b: any; c: any }) {
//   return { a, b };
// }

// console.log(desObj(obj));

// const { a, ...desObj2 } = obj;

// console.log(desObj2);

connectDatabase();

const app = express();
app.use(json());

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use("/api/users", usersRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
