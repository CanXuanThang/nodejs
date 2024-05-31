import { CartController } from "../controllers/cart.controller";
import { validateToken } from "../middlewares/role.middleware";
import BaseRouter from "./base.routers";

export default class CartRouter extends BaseRouter {
  public cartCtrl: CartController;

  constructor() {
    super();
    this.cartCtrl = new CartController();
    this.config();
  }
  config(): void {
    this.router.post("/create", validateToken, this.cartCtrl.createCart);
    this.router.put("/update", validateToken, this.cartCtrl.createCart);
    this.router.delete("/:id", validateToken, this.cartCtrl.deleteCart);
  }
}
