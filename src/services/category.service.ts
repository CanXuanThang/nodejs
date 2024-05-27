import { Repository } from "sequelize-typescript";
import { CategoryModel } from "../models/category.model";
import { sequelize } from "../databases/sequelize";

export class CategoryService {
  private categoryRepository: Repository<CategoryModel>;

  constructor() {
    this.categoryRepository = sequelize.getRepository(CategoryModel);
  }

  async getById(id: number): Promise<CategoryModel | null> {
    return await this.categoryRepository.findByPk(id);
  }

  async create(data: any): Promise<CategoryModel> {
    return await this.categoryRepository.create(data);
  }

  async update(id: number, data: any) {
    const category = await this.getById(id);
    if (category) {
      return await category.update(data);
    } else {
      return false;
    }
  }

  async getAll() {
    return this.categoryRepository.findAll();
  }

  async delete(id: number) {
    const category = await this.getById(id);

    if (category) {
      return await this.categoryRepository.destroy({ where: { id: id } });
    } else {
      return false;
    }
  }

  async getName(name: string) {
    const nameCategory = await this.categoryRepository.findOne({
      where: { name: name },
    });

    if (nameCategory) {
      return true;
    } else {
      return false;
    }
  }
}
