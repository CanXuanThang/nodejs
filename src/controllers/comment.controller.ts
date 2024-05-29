import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import BaseController from "./base.controller";

export class CommentController extends BaseController {
  public commentService: CommentService;

  constructor() {
    super();
    this.commentService = new CommentService();
  }

  getAllCommentByIdProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let { id } = req.params;
    try {
      const comments = await this.commentService.getAllByIdProduct(Number(id));

      if (comments) {
        this.resResponse.ok(res, comments);
      } else {
        this.resResponse.notFound(res, {});
      }
    } catch (err) {
      next(err);
    }
  };

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    let { content, user_id, product_id } = req.body;

    try {
      const objComment = {
        content,
        user_id,
        product_id,
      };
      const comment = await this.commentService.create(objComment);

      if (comment) {
        this.resResponse.ok(res, {}, "Comment success !");
      } else {
        this.resResponse.serverError(res, {});
      }
    } catch (err) {
      next(err);
    }
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;

    try {
      const result = await this.commentService.delete(Number(id));

      if (result) {
        this.resResponse.ok(res, {}, "Delete success !");
      } else {
        this.resResponse.serverError(res, {});
      }
    } catch (err) {
      next(err);
    }
  };
}
