import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Not found error");
  }

  // TODO: Find out why returning an empty array does not throw a TS error
  // answer: https://stackoverflow.com/a/62960545/11388821 - "Now an array of a given type can still be considered such if empty."
  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
