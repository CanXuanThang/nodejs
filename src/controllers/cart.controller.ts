import { NextFunction, Request, Response } from "express";
import { CartService } from "../services/cart.service";
import BaseController from "./base.controller";
import { ProductService } from "../services/product.service";

export class CartController extends BaseController {
  cartService: CartService;
  productService: ProductService;

  constructor() {
    super();
    this.cartService = new CartService();
    this.productService = new ProductService();
  }

  createCart = async (req: Request, res: Response, next: NextFunction) => {
    let { product_id, user_id, quantity, color, size } = req.body;

    try {
      let cartObj = {
        product_id,
        user_id,
        quantity,
        color,
        size,
      };
      const product = await this.productService.getById(Number(product_id));

      if (!product) {
        this.resResponse.badRequest(res, {}, "Product is't exist");
      }

      const cart = await this.cartService.create({
        ...cartObj,
        totalPrice: quantity * (product?.price || 1),
      });

      if (cart) {
        await this.productService.update(product_id, {
          quantity: (product?.quantity || 0) - quantity,
        });

        this.resResponse.ok(res, cart);
      } else {
        this.resResponse.serverError(res, {});
      }
    } catch (err) {
      next(err);
    }
  };

  updateCart = async (req: Request, res: Response, next: NextFunction) => {
    let { quantity, cart_id, color, size, product_id } = req.body;

    try {
      let cartObj = {
        quantity,
        color,
        size,
        product_id,
      };

      const product = await this.productService.getById(Number(product_id));

      if (!product) {
        this.resResponse.badRequest(res, {}, "Product is't exist");
      }
      const cart = await this.cartService.update(Number(cart_id), cartObj);

      if (cart) {
        await this.productService.update(product_id, {
          quantity: (product?.quantity || 0) - quantity,
        });

        this.resResponse.ok(res, cart);
      } else {
        this.resResponse.serverError(res, {});
      }
    } catch (err) {
      next(err);
    }
  };

  deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;

    try {
      const isResult = await this.cartService.delete(Number(id));

      if (isResult) {
        this.resResponse.ok(res, {}, "Delete success!");
      } else {
        this.resResponse.serverError(res, {});
      }
    } catch (err) {
      next(err);
    }
  };
}
