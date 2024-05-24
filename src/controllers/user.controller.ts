import { UserService } from "../services/user.service";
import BaseController from "./base.controller";
import { NextFunction, Request, Response } from "express";

export class UserController extends BaseController {
  userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.body.id;
    try {
      const userInfo = await this.userService.getById(user_id);

      if (userInfo) {
        this.resResponse.ok(res, userInfo);
      } else {
        this.resResponse.notFound(res, {});
      }
    } catch (err) {
      next(err);
    }
  };
}
