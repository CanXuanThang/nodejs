import { CategoryController } from "../controllers/category.controller";
import { grantAccess, validateToken } from "../middlewares/role.middleware";
import BaseRouter from "./base.routers";

export default class CategoryRouter extends BaseRouter {
  public categoryCtrl: CategoryController;

  constructor() {
    super();
    this.categoryCtrl = new CategoryController();
    this.config();
  }

  config(): void {
    this.router.post("/", this.categoryCtrl.getAllCategory);

    this.router.post(
      "/create",
      validateToken,
      grantAccess("create"),
      this.categoryCtrl.createCategory
    );

    this.router.put(
      '/update/"id',
      validateToken,
      grantAccess("update"),
      this.categoryCtrl.updateCategory
    );

    this.router.delete(
      "delete/:id",
      validateToken,
      grantAccess("delete"),
      this.categoryCtrl.deleteCategory
    );
  }
}
