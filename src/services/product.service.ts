import { Repository } from "sequelize-typescript";
import { ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";
import { sequelize } from "../databases/sequelize";
import { CommentModel } from "../models/comment.model";

export class ProductService {
  private repository: Repository<ProductModel>;
  private categoryRepository: Repository<CategoryModel>;
  private commentRepository: Repository<CommentModel>;

  constructor() {
    this.repository = sequelize.getRepository(ProductModel);
    this.categoryRepository = sequelize.getRepository(CategoryModel);
    this.commentRepository = sequelize.getRepository(CommentModel);
  }

  async getAll(): Promise<ProductModel[] | any> {
    return await this.repository.findAndCountAll({
      include: [
        {
          model: this.categoryRepository,
          required: true,
        },
      ],
    });
  }

  async getCommentByIdCategory(): Promise<ProductModel[] | any> {
    return await this.repository.findAndCountAll({
      include: {
        model: this.commentRepository,
        required: true,
      },
    });
  }
}
