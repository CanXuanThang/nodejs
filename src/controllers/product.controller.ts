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
    let { id } = req.params;
    try {
      const comments = await this.productService.getCommentByIdCategory(
        Number(id)
      );

      if (comments) {
        this.resResponse.ok(res, comments);
      } else {
        this.resResponse.notFound(res, {});
      }
    } catch (err) {
      next(err);
    }
  };

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    let {
      name,
      description,
      price,
      quantity,
      color,
      size,
      category_id,
      image,
      user_id,
    } = req.body;

    try {
      const objProduct = {
        name,
        description,
        price,
        quantity,
        color: JSON.stringify(color),
        size: JSON.stringify(size),
        category_id,
        image,
        user_id,
      };
      const product = await this.productService.create(objProduct);

      if (product) {
        this.resResponse.ok(res, product);
      } else {
        this.resResponse.serverError(res, {}, "Server error !");
      }
    } catch (err) {
      next(err);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;

    let {
      name,
      description,
      price,
      quantity,
      color,
      size,
      category_id,
      image,
    } = req.body;

    try {
      const isProduct = await this.productService.getById(Number(id));

      if (!isProduct) {
        return this.resResponse.badRequest(res, {}, "Product isn't exist !");
      }

      const objProduct = {
        name,
        description,
        price,
        quantity,
        color: JSON.stringify(color),
        size: JSON.stringify(size),
        category_id,
        image,
      };

      const product = await this.productService.update(Number(id), objProduct);

      if (product) {
        this.resResponse.ok(res, product);
      } else {
        this.resResponse.serverError(res, {});
      }
    } catch (err) {
      next(err);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;

    try {
      const isProduct = await this.productService.getById(Number(id));

      if (!isProduct) {
        this.resResponse.badRequest(res, {});
      }

      const result = await this.productService.delete(Number(id));

      if (result) {
        this.resResponse.ok(res, {}, "Delete product success !");
      } else {
        this.resResponse.serverError(res, {});
      }
    } catch (err) {
      next(err);
    }
  };
}
