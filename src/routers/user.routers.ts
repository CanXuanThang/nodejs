import { UserController } from "../controllers/user.controller";
import BaseRouter from "./base.routers";
import { grantAccess, validateToken } from "../middlewares/role.middleware";
import { upload } from "../middlewares/upload.middleware";
import * as validate from "../helpers/validate.helper";

export default class UserRouter extends BaseRouter {
  public userCtrl: UserController;

  constructor() {
    super();
    this.userCtrl = new UserController();
    this.config();
  }

  config() {
    this.router.get("/", validateToken, this.userCtrl.getUserInfo);

    this.router.get(
      "/search/:email/:name",
      validateToken,
      grantAccess({ 1: "admin" }),
      this.userCtrl.searchByEmailOrNameUser
    );

    this.router.put(
      "/update-user/:id",
      validate.createUser,
      validateToken,
      this.userCtrl.updateUser
    );

    this.router.post("/forgot-password", this.userCtrl.changePasswordUseEmail);

    this.router.delete(
      "/:id",
      validateToken,
      grantAccess({ 1: "admin" }),
      this.userCtrl.deleteUser
    );

    this.router.post("/login", validate.createUser, this.userCtrl.loginUser);

    this.router.post(
      "/register",
      validate.createUser,
      this.userCtrl.createUser
    );

    this.router.post(
      "/upload/:id",
      validateToken,
      upload.single("avatar"),
      this.userCtrl.uploadAvatar
    );
  }
}
