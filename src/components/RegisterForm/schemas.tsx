import Joi from "joi";

const emailSchema = Joi.string()
  .email({ tlds: false })
  .required()
  .label("email");
const usernameSchema = Joi.string()
  .pattern(/^[a-zA-Z0-9 ]*$/)
  .max(30)
  .min(4)
  .required()
  .label("username");
const passwordSchema = Joi.string()
  .alphanum()
  .max(30)
  .min(4)
  .required()
  .label("password");

const pictureSchema = Joi.object({
  size: Joi.number().max(500000),
  type: Joi.string(),
  name: Joi.string()
}).unknown();

export { emailSchema, usernameSchema, passwordSchema, pictureSchema };
