import { Repository } from "sequelize-typescript";
import { CommentModel } from "../models/comment.model";
import { sequelize } from "../databases/sequelize";

export class CommentService {
  private commentRepository: Repository<CommentModel>;

  constructor() {
    this.commentRepository = sequelize.getRepository(CommentModel);
  }
}
