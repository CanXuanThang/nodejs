import { Router } from "express";
import UserRouter from "./user.routers";
import ProductRouter from "./product.routers";
import CategoryRouter from "./category.router";

class MainRouters {
  public routers: Router;

  constructor() {
    this.routers = Router();
    this.config();
  }

  private config() {
    this.routers.use("/users", new UserRouter().router);
    this.routers.use("/products", new ProductRouter().router);
    this.routers.use("/category", new CategoryRouter().router);
  }
}

export default new MainRouters().routers;
