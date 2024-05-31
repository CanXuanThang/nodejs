import { ProductController } from "../controllers/product.controller";
import { grantAccess, validateToken } from "../middlewares/role.middleware";
import BaseRouter from "./base.routers";

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
      validateToken,
      grantAccess("create"),
      this.productCtrl.createProduct
    );

    this.router.put(
      "/update/:id",
      validateToken,
      grantAccess("update"),
      this.productCtrl.updateProduct
    );

    this.router.put(
      "/delete/:id",
      validateToken,
      grantAccess("delete"),
      this.productCtrl.deleteProduct
    );
  }
}
