const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
import mailer from "../configs/mailer.config";

export const hasPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

export const comparePassword = (
  password: string,
  hasPassword: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hasPassword, (err: Error, result: boolean) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const generateToken = (id: number, role: number) => {
  const jwtKey = process.env.IWT_SECRET_KEY;

  return jwt.sign({ id, role }, jwtKey, { expiresIn: "24h" });
};

export const sendPasswordMailer = async (email: string, password: string) => {
  const transporter = nodemailer.createTransport({
    host: mailer.host,
    port: mailer.port,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: mailer.user,
      pass: mailer.password,
    },
  });

  await transporter.sendMail({
    from: '"Management Store" <nguoikongten@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Forgot password ?", // Subject line
    text: "Hello?", // plain text body
    html: `<h4>Hello !</h4><span>You have gotten password and you need change password.</span><br><span>New your password: <strong>${password}</strong></span><br><span>You need change password when you receive this notification !</span>`, // html body
  });

  return true;
};

export const generatePassword = async (length: number = 12) => {
  return Math.random().toString(36).substr(2, length);
};
