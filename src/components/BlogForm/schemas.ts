import Joi from "joi";

const customMessages = {
  "string.base": "{{#label}} should be a type of text",
  "string.empty": "{{#label}} should not be empty",
  "string.pattern.base": "{{#label}} contains invalid characters",
  "string.min": "{{#label}} should have at least {#limit} characters",
  "string.max": "{{#label}} should have at most {#limit} characters",
  "number.base": "{{#label}} should be a type of number",
  "number.min": "{{#label}} cannot possibly be less than {{#limit}}",
  "number.max": "{{#label}} should be at most {#limit}",
  "array.base": "{{#label}} should be an array",
  "array.includes": "{{#label}} contains invalid elements",
  "array.includesRequiredKnowns": "{{#label}} should have at least one item",
  "any.required": "{{#label}} is a required field",
  "number.multiple": "{{#number}} fuck you"
};

export const titleSchema = Joi.string()
  .pattern(/^[a-zA-Z0-9 ]*$/)
  .max(30)
  .min(3)
  .required()
  .label("Title")
  .messages({
    ...customMessages
  });
export const mainTagSchema = Joi.string()
  .required()
  .label("Main Tag")
  .messages({
    ...customMessages
  });
export const secondaryTagsSchema = Joi.array()
  .required()
  .items(Joi.string().label("Secondary tag").required())
  .label("Secondary Tags")
  .messages({
    ...customMessages
  });
export const descSchema = Joi.string()
  .min(50)
  .max(1000)
  .label("Description")
  .required()
  .messages({
    ...customMessages
  });
export const servingsSchema = Joi.number()
  .max(30)
  .label("Servings")
  .min(1)
  .messages({
    ...customMessages
  });
export const directionSchema = Joi.string()
  .label("Direction")
  .min(10)
  .max(200)
  .required()
  .messages({
    ...customMessages
  });
export const directionsSchema = Joi.array()
  .items(directionSchema)
  .label("Directions")
  .messages({
    ...customMessages
  });

export const conclusionSchema = Joi.string()
  .max(1000)
  .label("Conlusion")
  .messages({
    ...customMessages
  });
export const blogPictureSchema = Joi.object({
  size: Joi.number().max(5000000),
  type: Joi.string(),
  name: Joi.string()
})
  .unknown()
  .messages({
    ...customMessages
  });
export const difficultySchema = Joi.string()
  .required()
  .label("Difficulty")
  .messages({
    ...customMessages
  });
export const cookTimeSchema = Joi.number()
  .label("Cooking Time")
  .min(0)
  .messages({
    ...customMessages
  });
export const prepTimeSchema = Joi.number()
  .required()
  .label("Preparation Time")
  .min(1)
  .messages({
    ...customMessages,
    "number.min": "{{#label}} isn't regularly less than 1"
  });
export const caloriesSchema = Joi.number()
  .label("Calories")
  .min(1)
  .messages({
    ...customMessages
  });

export const ingUnitSchema = Joi.string()
  .label("Unit")
  .required()
  .pattern(/^[a-zA-Z0-9 ]*$/)
  .messages({
    ...customMessages
  });
export const ingQuanitySchema = Joi.number()
  .label("Ingredient quantity")
  .max(30)
  .min(0.1)
  .required()
  .messages({
    ...customMessages,
    "number.min": "{{#label}} should be more than 0"
  });
export const ingNameSchema = Joi.string()
  .pattern(/^[a-zA-Z0-9 ]*$/)
  .label("Ingredient name")
  .max(30)
  .min(2)
  .required()
  .messages({
    ...customMessages
  });
export const ingDetailsSchema = Joi.string()
  .label("Ingredient Details")
  .min(0)
  .max(100)
  .messages({
    ...customMessages
  });
export const ingredientSchema = Joi.object({
  unit: ingUnitSchema,
  quantity: ingQuanitySchema,
  name: ingNameSchema,
  details: ingDetailsSchema
})
  .label("Ingredient")
  .required()
  .messages({
    ...customMessages
  });
export const ingredientsSchema = Joi.array()
  .items(ingredientSchema)
  .label("Ingredients")
  .messages({
    ...customMessages
  });
