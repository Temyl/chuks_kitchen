import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  public statusCode: number;
  public errorCode?: string;

  constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    errorCode?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}