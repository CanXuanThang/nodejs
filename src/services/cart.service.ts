import { Repository } from "sequelize-typescript";
import { CartModel } from "../models/cart.model";

const db = require("../models");

export class CartService {
  private cartRepository: Repository<CartModel>;

  constructor() {
    this.cartRepository = db.carts;
  }
}
