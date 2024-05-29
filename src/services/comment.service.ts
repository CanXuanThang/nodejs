import { Repository } from "sequelize-typescript";
import { CommentModel } from "../models/comment.model";
import { sequelize } from "../databases/sequelize";
import { UserModel } from "../models/user.model";

export class CommentService {
  private commentRepository: Repository<CommentModel>;
  private userRepository: Repository<UserModel>;

  constructor() {
    this.commentRepository = sequelize.getRepository(CommentModel);
    this.userRepository = sequelize.getRepository(UserModel);
  }

  async create(data: any): Promise<CommentModel> {
    return await this.commentRepository.create(data);
  }

  async delete(id: number) {
    return await this.commentRepository.destroy({ where: { id: id } });
  }

  async getAllByIdProduct(id: number) {
    return this.commentRepository.findAndCountAll({
      where: { product_id: id },
      include: [
        {
          model: this.userRepository,
          required: true,
        },
      ],
    });
  }
}
