import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import BaseController from "./base.controller";

export class ProductController extends BaseController {
  productService: ProductService;

  constructor() {
    super();
    this.productService = new ProductService();
  }

  getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getAll();

      if (products) {
        this.resResponse.ok(res, products);
      } else {
        this.resResponse.notFound(res, {});
      }
    } catch (err) {
      next(err);
    }
  };

  getCommentProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const comments = await this.productService.getCommentByIdCategory();

      if (comments) {
        this.resResponse.ok(res, comments);
      } else {
        this.resResponse.notFound(res, {});
      }
    } catch (err) {
      next(err);
    }
  };
}
