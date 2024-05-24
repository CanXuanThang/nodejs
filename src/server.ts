import app from "./app";
require("dotenv").config();
// const connection = require("./databases/sequelize");

const port = process.env.PORT || 3001;

// connection();
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
