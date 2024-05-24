const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

export const generateToken = (id: number) => {
  const jwtKey = process.env.IWT_SECRET_KEY;

  return jwt.sign({ id }, jwtKey, { expiresIn: "3d" });
};
