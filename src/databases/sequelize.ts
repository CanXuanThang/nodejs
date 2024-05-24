import { Sequelize } from "sequelize-typescript";

import { UserModel } from "../models/user.model";
import { BillModel } from "../models/bill.model";
import { CartModel } from "../models/cart.model";
import { CategoryModel } from "../models/category.model";
import { CommentModel } from "../models/comment.model";
import { ProductModel } from "../models/product.model";

export const sequelize = new Sequelize({
  dialect: "mysql",
  replication: {
    read: [
      {
        host: "localhost",
        username: "root",
        password: "123123",
        database: "study",
        port: "3307",
      },
    ],
    write: {
      host: "localhost",
      username: "root",
      password: "123123",
      database: "study",
      port: "3307",
    },
  },
  pool: {
    max: 20,
    idle: 30000,
  },
  models: [
    UserModel,
    BillModel,
    CartModel,
    CategoryModel,
    CommentModel,
    ProductModel,
  ],
  repositoryMode: true,
});

export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
