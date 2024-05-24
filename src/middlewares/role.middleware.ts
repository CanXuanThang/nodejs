import ResponseService from "../services/response.service";
import { UserService } from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const resService = new ResponseService();

  if (authHeader) {
    const decoded: any = jwtDecode(authHeader);
    const user = decoded;

    const userService = new UserService();
    const existedUser = await userService.getById(user.id);

    if (!existedUser) return resService.unauthorization(res);
    next();
  } else {
    resService.unauthorization(res);
  }

  next();
};
