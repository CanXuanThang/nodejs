import { Repository } from "sequelize-typescript";
import { ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";
import { sequelize } from "../databases/sequelize";
import { CommentModel } from "../models/comment.model";
import { Op } from "sequelize";
import { getPagingData } from "../helpers/utils.helper";

export class ProductService {
  private repository: Repository<ProductModel>;
  private categoryRepository: Repository<CategoryModel>;
  private commentRepository: Repository<CommentModel>;

  constructor() {
    this.repository = sequelize.getRepository(ProductModel);
    this.categoryRepository = sequelize.getRepository(CategoryModel);
    this.commentRepository = sequelize.getRepository(CommentModel);
  }

  async getAll(page?: number, limit?: number): Promise<ProductModel[] | any> {
    const currentPage = page || 1;
    const limitRecord = limit || 20;

    const offset = (currentPage - 1) * limitRecord;

    const rows = await this.repository.findAndCountAll({
      include: [
        {
          model: this.categoryRepository,
          required: true,
        },
      ],
      limit: limit,
      offset: offset,
    });
    const result = getPagingData(rows, currentPage, limitRecord);
    return result;
  }

  async getCommentByIdCategory(id: number): Promise<ProductModel[] | any> {
    return await this.repository.findAndCountAll({
      where: { id: id },
      include: {
        model: this.commentRepository,
        required: true,
      },
    });
  }

  async getById(id: number): Promise<ProductModel | null> {
    return await this.repository.findByPk(id);
  }

  async create(data: any): Promise<ProductModel> {
    return await this.repository.create(data);
  }

  async update(id: number, data: any) {
    const product = await this.getById(id);

    if (product) {
      return product.update(data);
    } else {
      return false;
    }
  }

  async delete(id: number) {
    return this.repository.destroy({ where: { id: id } });
  }

  async search(name: string) {
    return this.repository.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${name}` } },
          { "$category.name$": { [Op.like]: `%${name}` } },
        ],
      },
      include: [
        {
          model: this.categoryRepository,
          required: true,
        },
      ],
    });
  }
}
