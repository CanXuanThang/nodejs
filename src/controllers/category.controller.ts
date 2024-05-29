import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import BaseController from "./base.controller";

import { v2 as cloudinary } from "cloudinary";
import Cloudinary from "../configs/cloudinary.config";
export class CategoryController extends BaseController {
  categoryService: CategoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService();
  }

  getAllCategory = async (req: any, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryService.getAll();

      if (categories) {
        this.resResponse.ok(res, categories);
      } else {
        this.resResponse.notFound(res, {});
      }
    } catch (err) {
      next(err);
    }
  };

  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    let { name } = req.body;

    try {
      const isNameCategory = await this.categoryService.getName(name);

      if (isNameCategory) {
        this.resResponse.badRequest(res, {}, "Category is exist !");
      } else {
        const response = await this.categoryService.create(name);
        this.resResponse.ok(res, response);
      }
    } catch (err) {
      next(err);
    }
  };

  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let { name } = req.body;

    try {
      const category = await this.categoryService.update(Number(id), {
        name: name,
      });

      if (category) {
        this.resResponse.ok(res, category);
      } else {
        this.resResponse.badRequest(
          res,
          {},
          "Opps! Can't update this user right now, please try again later."
        );
      }
    } catch (err) {
      next(err);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const category = await this.categoryService.getById(Number(id));

      if (category) {
        await this.categoryService.delete(Number(id));

        this.resResponse.ok(res, {});
      } else {
        this.resResponse.badRequest(res, {}, "Category isn't exist !");
      }
    } catch (err) {
      next(err);
    }
  };

  getAllCategoryByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      const categories = await this.categoryService.getProductByUserId(
        Number(id)
      );
      if (categories) {
        this.resResponse.ok(res, categories);
      } else {
        this.resResponse.badRequest(res, {}, "Opps! Server error");
      }
    } catch (err) {
      next(err);
    }
  };
}
