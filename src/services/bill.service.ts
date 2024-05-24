import { Repository } from "sequelize-typescript";
import { BillModel } from "../models/bill.model";

const db = require("../models");

export class BillService {
  private billRespository: Repository<BillModel>;

  constructor() {
    this.billRespository = db.bills;
  }
}
