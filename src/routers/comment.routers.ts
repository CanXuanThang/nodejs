import { CommentController } from "../controllers/comment.controller";
import { grantAccess, validateToken } from "../middlewares/role.middleware";
import BaseRouter from "./base.routers";

export default class CommentRouter extends BaseRouter {
  public commentCtrl: CommentController;

  constructor() {
    super();
    this.commentCtrl = new CommentController();
    this.config();
  }

  config(): void {
    this.router.get(
      "/:id",
      validateToken,
      grantAccess("read"),
      this.commentCtrl.getAllCommentByIdProduct
    );

    this.router.post(
      "/create",
      validateToken,
      grantAccess("create"),
      this.commentCtrl.createComment
    );
    this.router.delete(
      "/:id",
      validateToken,
      grantAccess("delete"),
      this.commentCtrl.deleteComment
    );
  }
}
