import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";

@Table({
  tableName: "carts",
})
export class CartModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column product_id: number;

  @Column user_id: number;

  @Column quantity: number;

  @Column totalPrice: number;

  @Column color: string;

  @Column size: string;

  @CreatedAt created_at: Date;

  @UpdatedAt updated_at: Date;

  @BelongsTo(() => ProductModel, { foreignKey: "product_id" })
  product: ProductModel;

  @BelongsTo(() => UserModel, { foreignKey: "user_id" })
  user: UserModel;
}
