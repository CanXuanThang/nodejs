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
    this.router.get("/", this.userCtrl.getUserInfo);
    // this.router.post("/getUser", validateToken, this.userCtrl.);
  }
}
