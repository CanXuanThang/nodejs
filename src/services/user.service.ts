import { Op } from "sequelize";
import { sequelize } from "../databases/sequelize";
import { hasPassword, sendPasswordMailer } from "../helpers/auth.helper";
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

  async delete(id: number): Promise<UserModel | number> {
    return await this.userRespository.destroy({ where: { id: id } });
  }

  async forgotPassword(
    email: string,
    password: string
  ): Promise<UserModel | boolean> {
    const user = await this.getUserByEmail(email);

    if (user) {
      await user.update({ password: await hasPassword(password) });
      return await sendPasswordMailer(email, password);
    } else {
      return false;
    }
  }

  async search(email: string, name: string): Promise<UserModel[] | null> {
    return await this.userRespository.findAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.like]: `%${name}` } },
          { last_name: { [Op.like]: `%${name}` } },
          { email: { [Op.like]: `%${email}` } },
        ],
      },
    });
  }
}
