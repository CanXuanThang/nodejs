import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize("study", "root", "123123", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
  logging: false,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connection;
