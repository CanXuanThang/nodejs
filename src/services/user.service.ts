import { sequelize } from "../databases/sequelize";
import { UserModel } from "../models/user.model";
import { Repository } from "sequelize-typescript";

export class UserService {
  private userRespository: Repository<UserModel>;

  constructor() {
    this.userRespository = sequelize.getRepository(UserModel);
  }

  async create(data: any): Promise<UserModel> {
    return await this.userRespository.create(data);
  }

  async getById(id: number): Promise<UserModel | null> {
    return await this.userRespository.findByPk(id);
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    return await this.userRespository.findOne({
      where: { email: email },
    });
  }

  async update(id: number, data: any) {
    const user = await this.getById(id);
    if (user) {
      return await user.update(data);
    } else {
      return false;
    }
  }

  async delete(id: number) {
    return await this.userRespository.destroy({ where: { id: id } });
  }
}
