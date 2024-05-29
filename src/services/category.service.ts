import { Repository } from "sequelize-typescript";
import { CategoryModel } from "../models/category.model";
import { sequelize } from "../databases/sequelize";
import { UserModel } from "../models/user.model";

export class CategoryService {
  private categoryRepository: Repository<CategoryModel>;
  private userRepository: Repository<UserModel>;

  constructor() {
    this.categoryRepository = sequelize.getRepository(CategoryModel);
    this.userRepository = sequelize.getRepository(UserModel);
  }

  async getById(id: number): Promise<CategoryModel | null> {
    return await this.categoryRepository.findByPk(id);
  }

  async create(data: any): Promise<CategoryModel> {
    return await this.categoryRepository.create(data);
  }

  async update(id: number, data: any): Promise<CategoryModel | boolean> {
    const category = await this.getById(id);
    if (category) {
      return await category.update(data);
    } else {
      return false;
    }
  }

  async getAll(): Promise<CategoryModel[]> {
    return this.categoryRepository.findAll();
  }

  async delete(id: number): Promise<any> {
    const category = await this.getById(id);

    if (category) {
      return await this.categoryRepository.destroy({ where: { id: id } });
    } else {
      return false;
    }
  }

  async getName(name: string): Promise<boolean> {
    const nameCategory = await this.categoryRepository.findOne({
      where: { name: name },
    });

    if (nameCategory) {
      return true;
    } else {
      return false;
    }
  }

  async getProductByUserId(id: number): Promise<UserModel[] | boolean> {
    const categories = await this.userRepository.findAll({
      where: { id: id },
      include: [
        {
          model: this.categoryRepository,
          required: true,
          attributes: ["id", "name"],
        },
      ],
    });

    if (categories) {
      return categories;
    } else {
      return false;
    }
  }
}
