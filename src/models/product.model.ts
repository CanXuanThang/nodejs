import {
  BelongsTo,
  Column,
  CreatedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { CategoryModel } from "./category.model";
import { CommentModel } from "./comment.model";

@Table({
  tableName: "products",
})
export class ProductModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column name: string;

  @Column description: string;

  @Column price: number;

  @Column quantity: number;

  @Column color: string;

  @Column size: string;

  @Column category_id: number;

  @Column user_id: number;

  @Column image: string;

  @CreatedAt created_at: Date;

  @UpdatedAt updated_at: Date;

  @BelongsTo(() => CategoryModel, { foreignKey: "category_id" })
  category: CategoryModel;

  @HasMany(() => CommentModel, { foreignKey: "product_id" })
  comments: [CommentModel];
}
