import {
  BelongsTo,
  Column,
  CreatedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ProductModel } from "./product.model";
import { CartModel } from "./cart.model";

@Table({
  tableName: "bills",
})
export class BillModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column address: string;

  @Column note: string;

  @Column user_id: number;

  @CreatedAt created_at: Date;

  @UpdatedAt updated_at: Date;

  @BelongsTo(() => UserModel, { foreignKey: "user_id" })
  user: UserModel;

  // @HasMany(() => ProductModel, { foreignKey: "id" })
  // products: [ProductModel];

  @HasMany(() => CartModel, { foreignKey: "user_id", sourceKey: "user_id" })
  carts: CartModel[];
}
