import { CustomError, SerializedError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super("Not authorized");
  }

  serializeErrors(): SerializedError[] {
    return [{ message: "You are not authorized to access that resource" }];
  }
}
