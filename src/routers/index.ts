import { Router } from "express";
import UserRouter from "./user.routers";

class MainRouters {
  public routers: Router;

  constructor() {
    this.routers = Router();
    this.config();
  }

  private config() {
    this.routers.use("/users", new UserRouter().router);
  }
}

export default new MainRouters().routers;
