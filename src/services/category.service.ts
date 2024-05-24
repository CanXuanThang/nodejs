import { Repository } from "sequelize-typescript";
import { CategoryModel } from "../models/category.model";
import { sequelize } from "../databases/sequelize";

export class CategoryService {
  private categoryRepository: Repository<CategoryModel>;

  constructor() {
    this.categoryRepository = sequelize.getRepository(CategoryModel);
  }
}
