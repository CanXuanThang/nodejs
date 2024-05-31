import { Repository } from "sequelize-typescript";
import { CartModel } from "../models/cart.model";
import { sequelize } from "../databases/sequelize";
import { UserModel } from "../models/user.model";
import { ProductService } from "./product.service";
import { ProductModel } from "../models/product.model";

export class CartService {
  private cartRepository: Repository<CartModel>;
  private userRepository: Repository<UserModel>;
  private productRepository: Repository<ProductModel>;
  public productService: ProductService;

  constructor() {
    this.cartRepository = sequelize.getRepository(CartModel);
    this.userRepository = sequelize.getRepository(UserModel);
    this.productRepository = sequelize.getRepository(ProductModel);
    this.productService = new ProductService();
  }

  async getByIdUser(id: number) {
    return await this.cartRepository.findAll({
      where: { id: id },
      include: {
        model: this.userRepository,
        required: true,
        attributes: [],
      },
    });
  }

  async getById(id: number) {
    return await this.cartRepository.findByPk(id);
  }

  async create(data: any) {
    const result = await this.cartRepository.create(data);

    if (result) {
      return await this.cartRepository.findOne({
        where: { id: result.id },
        include: {
          model: this.productRepository,
          required: true,
          attributes: ["name", "price", "image", "description"],
        },
      });
    } else {
      return false;
    }
  }

  async update(id: number, data: any) {
    const cart = await this.getById(id);

    if (cart) {
      return await cart.update(data);
    } else {
      return false;
    }
  }

  async delete(id: number) {
    const cart = await this.getById(id);

    if (cart) {
      return await this.cartRepository.destroy({ where: { id: id } });
    } else {
      return false;
    }
  }
}
