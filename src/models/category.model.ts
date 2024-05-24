import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { ProductModel } from "./product.model";

@Table({
  tableName: "categories",
})
export class CategoryModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column name: string;

  @CreatedAt created_at: Date;

  @UpdatedAt updated_at: Date;

  @HasMany(() => ProductModel, { foreignKey: "category_id" })
  products: ProductModel[];
}
