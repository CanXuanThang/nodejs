import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "categories",
})
export class CategoryModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column name: string;

  @CreatedAt create_at: Date;

  @UpdatedAt update_at: Date;
}
