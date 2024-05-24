import { Repository } from "sequelize-typescript";
import { CategoryModel } from "../models/category.model";

const db = require("../models");

export class CategoryService {
  private categoryRepository: Repository<CategoryModel>;

  constructor() {
    this.categoryRepository = db.categories;
  }
}
