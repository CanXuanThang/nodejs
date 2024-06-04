import { CategoryController } from "../controllers/category.controller";
import { grantAccess, validateToken } from "../middlewares/role.middleware";
import BaseRouter from "./base.routers";
import * as validate from "../helpers/validate.helper";

export default class CategoryRouter extends BaseRouter {
  public categoryCtrl: CategoryController;

  constructor() {
    super();
    this.categoryCtrl = new CategoryController();
    this.config();
  }

  config(): void {
    this.router.get("/", this.categoryCtrl.getAllCategory);

    this.router.get(
      "/get-category-by-user/:id",
      validateToken,
      this.categoryCtrl.getAllCategoryByUserId
    );

    this.router.post(
      "/create",
      validate.createCategory,
      validateToken,
      grantAccess("create", { 1: "admin", 2: "admin_store" }),
      this.categoryCtrl.createCategory
    );

    this.router.put(
      "/update/:id",
      validate.createCategory,
      validateToken,
      grantAccess("update", { 1: "admin", 2: "admin_store" }),
      this.categoryCtrl.updateCategory
    );

    this.router.delete(
      "delete/:id",
      validateToken,
      grantAccess("delete", { 1: "admin", 2: "admin_store" }),
      this.categoryCtrl.deleteCategory
    );
  }
}
