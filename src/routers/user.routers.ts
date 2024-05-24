import { UserController } from "../controllers/user.controller";
import BaseRouter from "./base.routers";
import { validateToken } from "../middlewares/role.middleware";

export default class UserRouter extends BaseRouter {
  public userCtrl: UserController;

  constructor() {
    super();
    this.userCtrl = new UserController();
    this.config();
  }

  config() {
    this.router.get("/user-info", validateToken, this.userCtrl.getUserInfo);
    this.router.post("/create-user", this.userCtrl.createUser);
  }
}
