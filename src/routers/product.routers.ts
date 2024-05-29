import { ProductController } from "../controllers/product.controller";
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
    this.router.get("/get-comment", this.productCtrl.getCommentProduct);
  }
}
