import { CustomError, SerializedError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super("Bad Request Error");
  }

  serializeErrors(): SerializedError[] {
    return [{ message: this.message }];
  }
}
