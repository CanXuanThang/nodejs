import { Repository } from "sequelize-typescript";
import { BillModel } from "../models/bill.model";
import { sequelize } from "../databases/sequelize";
import { CartModel } from "../models/cart.model";
import { ProductModel } from "../models/product.model";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { stream } from "exceljs";
import { createExcelFile } from "../helpers/excel.helper";

const excelJS = require("exceljs");

export class BillService {
  private billRespository: Repository<BillModel>;
  private cartRepository: Repository<CartModel>;
  private productRepository: Repository<ProductModel>;

  constructor() {
    this.billRespository = sequelize.getRepository(BillModel);
    this.cartRepository = sequelize.getRepository(CartModel);
    this.productRepository = sequelize.getRepository(ProductModel);
  }

  async getByUserId(id: number) {
    return await this.billRespository.findAll({
      where: { user_id: id },
      include: {
        where: { user_id: id },
        model: this.cartRepository,
        required: true,
        include: [
          {
            model: this.productRepository,
            required: true,
          },
        ],
      },
    });
  }

  async getBillForAdmin(id: number) {
    return await this.billRespository.findAll({
      include: {
        model: this.cartRepository,
        required: true,
        include: [
          {
            where: { user_id: id },
            model: this.productRepository,
            required: true,
          },
        ],
      },
    });
  }

  async downloadBill(id: number, res: Response) {
    const bills = await this.getBillForAdmin(id);

    const workbook = await createExcelFile(bills);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "bills" + id + ".xlsx"
    );

    await workbook.xlsx.write(res);
  }
}
