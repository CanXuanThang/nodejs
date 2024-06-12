import { NextFunction, Request, Response } from "express";
import { BillService } from "../services/bill.service";
import BaseController from "./base.controller";
import { jwtDecode } from "jwt-decode";

export class BillController extends BaseController {
  billService: BillService;

  constructor() {
    super();
    this.billService = new BillService();
  }

  getBillByUserId = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;

    try {
      const bills = await this.billService.getByUserId(Number(id));

      if (bills) {
        this.resResponse.ok(res, bills);
      } else {
        this.resResponse.serverError(res, {});
      }
    } catch (err) {
      next(err);
    }
  };

  downloadFile = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;

    try {
      await this.billService.downloadBill(Number(id), res);

      this.resResponse.ok(res, {});
    } catch (err) {
      next(err);
    }
  };

  getBillByIdUserAndMonth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const decoded: any = jwtDecode(token || "");

    try {
      const result = await this.billService.getBillByMonth(Number(decoded.id));

      if (result) {
        this.resResponse.ok(res, result);
      } else {
        this.resResponse.serverError(res, {});
      }
    } catch (err) {
      next;
    }
  };
}
