import app from "./app";
import { connection, sequelize } from "./databases/sequelize";
require("dotenv").config();
// const connection = require("./databases/sequelize");

const port = process.env.PORT || 3001;

// connection();

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
