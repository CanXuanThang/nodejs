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
      grantAccess({ 1: "admin", 2: "admin_store" }),
      this.billCtrl.getBillByUserId
    );

    this.router.get(
      "/get-bill-by-month",
      // validateToken,
      this.billCtrl.getBillByIdUserAndMonth
    );

    this.router.get(
      "/download/:id",
      validateToken,
      grantAccess({ 1: "admin", 2: "admin_store" }),
      this.billCtrl.downloadFile
    );
  }
}
