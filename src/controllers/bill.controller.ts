import { NextFunction, Request, Response } from "express";
import { BillService } from "../services/bill.service";
import BaseController from "./base.controller";

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
      const isResult = await this.billService.downloadBill(Number(id), res);

      this.resResponse.ok(res, isResult);
    } catch (err) {
      next(err);
    }
  };
}
