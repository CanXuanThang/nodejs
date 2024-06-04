import ResponseService from "../services/response.service";
import { UserService } from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { ROLE_ADMIN } from "../types/constants";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const resService = new ResponseService();

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const decoded: any = jwtDecode(token);
    const user = decoded;

    const userService = new UserService();
    const existedUser = await userService.getById(user.id);

    if (!existedUser) return resService.unauthorization(res);
  } else {
    resService.unauthorization(res);
  }

  next();
};

export const grantAccess = (
  action: "read" | "create" | "delete" | "update" | "download",
  role: object
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resService = new ResponseService();

      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];
      const decoded: any = jwtDecode(token || "");

      if (decoded && decoded.role in role && action in ROLE_ADMIN) {
        next();
      } else {
        return resService.notHavePermission(res, {});
      }
    } catch (err) {
      next(err);
    }
  };
};
