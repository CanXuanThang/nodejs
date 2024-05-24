import { Repository } from "sequelize-typescript";
import { CartModel } from "../models/cart.model";
import { sequelize } from "../databases/sequelize";

export class CartService {
  private cartRepository: Repository<CartModel>;

  constructor() {
    this.cartRepository = sequelize.getRepository(CartModel);
  }
}
