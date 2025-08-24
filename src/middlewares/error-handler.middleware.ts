import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/http-error.util';
import { HttpStatus } from '../constants/statusCode';
import { ResponseMessages } from '../constants/response-messages.contants';


export const errorHandler = (
  err: Error ,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message: string = ResponseMessages.SERVER_ERROR;
    console.log("This is error is form error handler", err)
  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  console.log()
  res.status(statusCode).json({ error: message });
};