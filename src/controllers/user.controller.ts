import {
  comparePassword,
  generateToken,
  hasPassword,
} from "../helpers/auth.helper";
import { UserService } from "../services/user.service";
import BaseController from "./base.controller";
import { NextFunction, Request, Response } from "express";
import { uploadFile } from "../services/upload.service";

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

  createUser = async (req: any, res: Response, next: NextFunction) => {
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

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return this.resResponse.badRequest(res, {}, "You need enter id user !");
      }

      let { last_name, first_name, password, phone_number, email } = req.body;

      const existedEmail = await this.userService.getUserByEmail(email);

      if (existedEmail)
        return this.resResponse.badRequest(
          res,
          {},
          "Email is exist, please try a other email !"
        );

      let userObj = {
        email,
        password: await hasPassword(password),
        first_name,
        last_name,
        phone_number,
      };

      const user = await this.userService.update(Number(id), userObj);

      if (user) {
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

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { password, email } = req.body;

      const user = await this.userService.getUserByEmail(email);

      if (user) {
        const isPassword = await comparePassword(password, user.password);
        if (isPassword) {
          this.resResponse.ok(res, {
            ...user.dataValues,
            token: await generateToken(user.id, user.role),
          });
        } else {
          this.resResponse.badRequest(res, {}, "Password isn't match!");
        }
      } else {
        this.resResponse.badRequest(res, {}, "Email is not exist!");
      }
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;

    try {
      const user = await this.userService.getById(Number(id));

      if (user) {
        await this.userService.delete(Number(id));
        this.resResponse.ok(res, {});
      } else {
        this.resResponse.badRequest(res, {}, "User is not exist!");
      }
    } catch (err) {
      next(err);
    }
  };

  uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    const { id } = req.params;

    try {
      if (!id) {
        return this.resResponse.badRequest(res, {}, "You need enter id user !");
      }

      const uploadUrl = await uploadFile(file, next);

      const user = await this.userService.update(Number(id), {
        avatar: uploadUrl,
      });

      if (user) {
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
