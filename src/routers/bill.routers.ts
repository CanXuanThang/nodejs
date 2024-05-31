import { BillController } from "../controllers/bill.controller";
import { grantAccess, validateToken } from "../middlewares/role.middleware";
import BaseRouter from "./base.routers";

export default class BillRouter extends BaseRouter {
  public billCtrl: BillController;

  constructor() {
    super();
    this.billCtrl = new BillController();
    this.config();
  }
  config(): void {
    this.router.get(
      "/bill-user/:id",
      validateToken,
      grantAccess("read"),
      this.billCtrl.getBillByUserId
    );

    this.router.get("/download/:id", this.billCtrl.downloadFile);
  }
}
