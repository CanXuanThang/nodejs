require("dotenv").config();

export default {
  host: process.env.HOST_MAILER,
  port: process.env.PORT_MAILER,
  user: process.env.USER_SENDMAILER,
  password: process.env.PASSWORD_SENMAILER,
};
