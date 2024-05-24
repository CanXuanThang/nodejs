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
  tableName: "comments",
})
export class CommentModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column content: string;

  @Column user_id: number;

  @Column product_id: number;

  @CreatedAt created_at: Date;

  @UpdatedAt updated_at: Date;

  @BelongsTo(() => ProductModel, { foreignKey: "product_id" })
  product: ProductModel;

  @BelongsTo(() => UserModel, { foreignKey: "user_id" })
  user: UserModel;
}
