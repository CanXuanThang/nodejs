import { UserModel } from "../models/user.model";
import { Repository } from "sequelize-typescript";

const db = require("../models");

export class UserService {
  private userRespository: Repository<UserModel>;

  constructor() {
    this.userRespository = db.getRepository(UserModel);
  }

  async create(data: any): Promise<UserModel> {
    return await this.userRespository.create(data);
  }

  async getById(id: number): Promise<UserModel | null> {
    return await this.userRespository.findByPk(id);
  }
}
