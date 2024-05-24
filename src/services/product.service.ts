import { Repository } from "sequelize-typescript";
import { ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";
import { sequelize } from "../databases/sequelize";

const db = require("../models");

export class ProductService {
  private productRepository: Repository<ProductModel>;
  private categoryRepository: Repository<CategoryModel>;

  constructor() {
    this.productRepository = sequelize.getRepository(ProductModel);
    this.categoryRepository = sequelize.getRepository(CategoryModel);
  }

  async getAll(): Promise<ProductModel[] | any> {
    return await this.categoryRepository.findAndCountAll({
      include: [
        {
          model: this.productRepository,
          required: true,
        },
      ],
    });
  }
}
