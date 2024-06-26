import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { CommentModel } from "./comment.model";
import { ProductModel } from "./product.model";
import { CategoryModel } from "./category.model";

@Table({
  tableName: "users",
})
export class UserModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column({
    unique: true,
    allowNull: false,
    validate: {
      isEmail: { msg: "It must be a valid email address" },
    },
  })
  email: string;

  @Column first_name: string;

  @Column last_name: string;

  @Column role: number;

  @Column phone_number: string;

  @Column password: string;

  @Column avatar: string;

  @CreatedAt created_at: Date;

  @UpdatedAt updated_at: Date;

  @HasMany(() => CommentModel, { foreignKey: "id" })
  comments: [CommentModel];

  @HasMany(() => ProductModel, { foreignKey: "user_id" })
  products: ProductModel[];

  @HasMany(() => CategoryModel, { foreignKey: "user_id" })
  categories: CategoryModel[];
}
