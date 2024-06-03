import { CartController } from "../controllers/cart.controller";
import { validateToken } from "../middlewares/role.middleware";
import BaseRouter from "./base.routers";
import * as validate from "../helpers/validate.helper";

export default class CartRouter extends BaseRouter {
  public cartCtrl: CartController;

  constructor() {
    super();
    this.cartCtrl = new CartController();
    this.config();
  }
  config(): void {
    this.router.post("/create", validateToken, this.cartCtrl.createCart);
    this.router.put(
      "/update",
      validate.createCart,
      validateToken,
      this.cartCtrl.createCart
    );
    this.router.delete("/:id", validateToken, this.cartCtrl.deleteCart);
  }
}
