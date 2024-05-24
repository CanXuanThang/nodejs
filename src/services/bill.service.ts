import { Repository } from "sequelize-typescript";
import { BillModel } from "../models/bill.model";
import { sequelize } from "../databases/sequelize";

const db = require("../models");

export class BillService {
  private billRespository: Repository<BillModel>;

  constructor() {
    this.billRespository = sequelize.getRepository(BillModel);
  }
}
