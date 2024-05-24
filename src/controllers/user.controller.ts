import { hasPassword } from "../helpers/auth.helper";
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
    const user_id = req.query.id;
    try {
      const userInfo = await this.userService.getById(Number(user_id));

      if (userInfo) {
        this.resResponse.ok(res, userInfo);
      } else {
        this.resResponse.notFound(res, {});
      }
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let {
        email,
        first_name,
        last_name,
        role = 2,
        phone_number,
        password,
      } = req.body;

      const isExistEmail = await this.userService.getUserByEmail(email);

      if (isExistEmail) {
        return this.resResponse.badRequest(
          res,
          {},
          "Email is exist, please try a other email !"
        );
      }

      let userObj = {
        email,
        first_name,
        last_name,
        phone_number,
        password: await hasPassword(password),
        role,
      };

      const user = await this.userService.create(userObj);

      if (user.id) {
        this.resResponse.ok(res, user);
      } else {
        this.resResponse.serverError(
          res,
          {},
          "Opps! Can't create this user right now, please try again later."
        );
      }
    } catch (err) {
      next(err);
    }
  };
}
