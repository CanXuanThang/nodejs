import { body } from "express-validator";

export const createUser = [
  body("email").isEmail(),
  body("first_email").isString,
  body("last_name").isString,
  body("role").isNumeric,
  body("phone_number").isString,
  body("password").isString,
];

export const createProduct = [
  body("name").isString,
  body("description").isString,
  body("price").isNumeric,
  body("color").isJSON,
  body("size").isJSON,
  body("category_id").isNumeric,
  body("user_id").isNumeric,
  body("image").isString,
];

export const createCart = [
  body("product_id").isNumeric,
  body("user_id").isNumeric,
  body("quantity").isNumeric,
  body("totalPrice").isNumeric,
  body("color").isString,
  body("size").isString,
];

export const createCategory = [
  body("name").isString,
  body("user_id").isNumeric,
];

export const createComment = [
  body("content").isString,
  body("user_id").isString,
  body("product_id").isNumeric,
];
