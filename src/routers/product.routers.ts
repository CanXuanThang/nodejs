import { ProductController } from "../controllers/product.controller";
import { grantAccess, validateToken } from "../middlewares/role.middleware";
import BaseRouter from "./base.routers";
import * as validate from "../helpers/validate.helper";

export default class ProductRouter extends BaseRouter {
  public productCtrl: ProductController;

  constructor() {
    super();
    this.productCtrl = new ProductController();
    this.config();
  }

  config() {
    this.router.get("/", this.productCtrl.getAllProduct);

    this.router.get(
      "/search/:name",
      this.productCtrl.searchByProductOrCategoryName
    );

    this.router.get("/:id", this.productCtrl.getProductById);

    this.router.get("/get-comment/:id", this.productCtrl.getCommentProduct);

    this.router.post(
      "/create",
      validate.createProduct,
      validateToken,
      grantAccess({ 1: "admin", 2: "admin_store" }),
      this.productCtrl.createProduct
    );

    this.router.put(
      "/update/:id",
      validate.createProduct,
      validateToken,
      grantAccess({ 1: "admin", 2: "admin_store" }),
      this.productCtrl.updateProduct
    );

    this.router.put(
      "/delete/:id",
      validateToken,
      grantAccess({ 1: "admin", 2: "admin_store" }),
      this.productCtrl.deleteProduct
    );
  }
}
