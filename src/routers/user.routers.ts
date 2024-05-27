import { UserController } from "../controllers/user.controller";
import BaseRouter from "./base.routers";
import { grantAccess, validateToken } from "../middlewares/role.middleware";

export default class UserRouter extends BaseRouter {
  public userCtrl: UserController;

  constructor() {
    super();
    this.userCtrl = new UserController();
    this.config();
  }

  config() {
    this.router.get("/", validateToken, this.userCtrl.getUserInfo);
    this.router.put(
      "/update-user/:id",
      validateToken,
      this.userCtrl.updateUser
    );
    this.router.delete(
      "/:id",
      validateToken,
      grantAccess("delete"),
      this.userCtrl.deleteUser
    );
    this.router.post("/login", this.userCtrl.loginUser);
    this.router.post("/register", this.userCtrl.createUser);
  }
}
