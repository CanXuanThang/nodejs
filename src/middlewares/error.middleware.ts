import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR);
  err.statusCodes = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  res.send(err);
};
