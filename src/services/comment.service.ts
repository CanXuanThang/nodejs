import { Repository } from "sequelize-typescript";
import { CommentModel } from "../models/comment.model";

const db = require("../models");

export class CommentService {
  private commentRepository: Repository<CommentModel>;

  constructor() {
    this.commentRepository = db.comments;
  }
}
