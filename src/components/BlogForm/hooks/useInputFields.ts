import InputField from "@/general-utils/inputField";
import { useState } from "react";
import {
  blogPictureSchema,
  caloriesSchema,
  conclusionSchema,
  cookTimeSchema,
  descSchema,
  difficultySchema,
  directionsSchema,
  ingredientsSchema,
  mainTagSchema,
  prepTimeSchema,
  secondaryTagsSchema,
  servingsSchema,
  titleSchema
} from "../schemas";
import { blogTags } from "@/general-utils/blogsFunctions";
import { Blog, Ingredient } from "@/types/blog-types";
import { Picture } from "@/types/user-types";
import type Joi from "joi";

export type InputFields = {
  titleField: InputField<string, string>;
  mainTagField: InputField<string, string>;
  secondaryTagsField: InputField<string[], string[]>;
  descField: InputField<string, string>;
  servingsField: InputField<number, number>;
  ingredientsField: InputField<Ingredient[], Ingredient[]>;
  directionsField: InputField<string[], string[]>;
  conclusionField: InputField<string, string>;
  blogPictureField: InputField<File, Picture>;
  difficultyField: InputField<string, string | Picture>;
  cookTimeField: InputField<number, number>;
  prepTimeField: InputField<number, number>;
  caloriesField: InputField<number, number>;
};
export default function useInputFields(blog: Blog | undefined) {
  const titleField = useTitleField(blog);
  const { mainTagField, secondaryTagsField } = useTagsField(blog);
  const descField = useDescField(blog);
  const servingsField = useServingsField(blog);
  const ingredientsField = useIngredientsField(blog);
  const directionsField = useDirectionsField(blog);
  const conclusionField = useConclusionField(blog);
  const blogPictureField = useBlogPictureField(blog);
  const difficultyField = useDifficultyField(blog);
  const cookTimeField = useCookTimeField(blog);
  const prepTimeField = usePrepTimeField(blog);
  const caloriesField = useCaloriesField(blog);

  const inputFields: InputFields = {
    titleField,
    mainTagField,
    secondaryTagsField,
    descField,
    servingsField,
    ingredientsField,
    directionsField,
    conclusionField,
    blogPictureField,
    difficultyField,
    cookTimeField,
    prepTimeField,
    caloriesField
  };
  const allFields = useState(Object.values(inputFields))[0];

  return { inputFields, allFields };
}

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "keyword-list"
  | "ingredient-list"
  | "directions-list"
  | "image";

function createField<
  T extends
    | string
    | number
    | File
    | Picture
    | string[]
    | Ingredient
    | Ingredient[]
    | null,
  U extends T | Picture
>(
  type: FieldType,
  schema: Joi.Schema,
  label: string,
  initialValue: U,
  options?: {
    max?: number;
    min?: number;
    step?: number;
    selectOptions?: string[];
    maxImageSize?: number;
  }
) {
  return () =>
    new InputField<T, U>({
      schema,
      type,
      label,
      initialValue,
      ...options
    });
}

export function useTitleField(blog?: Blog) {
  return useState(
    createField<string, string>("text", titleSchema, "Title", blog?.title ?? "")
  )[0];
}

export function useTagsField(blog?: Blog) {
  return {
    mainTagField: useState(
      createField<string, string>(
        "select",
        mainTagSchema,
        "Main Tag",
        blog?.mainTag ?? blogTags[0],
        { selectOptions: blogTags }
      )
    )[0],
    secondaryTagsField: useState(
      createField<string[], string[]>(
        "keyword-list",
        secondaryTagsSchema,
        "Secondary Tags",
        blog?.secondaryTags ?? [],
        { selectOptions: blogTags }
      )
    )[0]
  };
}

export function useDescField(blog?: Blog) {
  return useState(
    createField<string, string>(
      "textarea",
      descSchema,
      "Description",
      blog?.description ?? "",
      { max: 1000 }
    )
  )[0];
}

export function useServingsField(blog?: Blog) {
  return useState(
    createField<number, number>(
      "number",
      servingsSchema,
      "Servings",
      blog?.servings ?? 1,
      { step: 1, min: 1 }
    )
  )[0];
}

export function useIngredientsField(blog?: Blog) {
  return useState(
    createField<Ingredient[], Ingredient[]>(
      "ingredient-list",
      ingredientsSchema,
      "Ingredients",
      blog?.ingredients ?? []
    )
  )[0];
}

export function useDirectionsField(blog?: Blog) {
  return useState(
    createField<string[], string[]>(
      "directions-list",
      directionsSchema,
      "Directions",
      blog?.directions ?? []
    )
  )[0];
}

export function useConclusionField(blog?: Blog) {
  return useState(
    createField<string, string>(
      "textarea",
      conclusionSchema,
      "Conclusion",
      blog?.conclusion ?? "",
      { max: 1000 }
    )
  )[0];
}

export function useBlogPictureField(blog?: Blog) {
  return useState(
    createField<File, Picture>(
      "image",
      blogPictureSchema,
      "Recipe picture",
      blog?.picture ?? null,
      { maxImageSize: 5000000 }
    )
  )[0];
}

export function useDifficultyField(blog?: Blog) {
  return useState(
    createField<string, string>(
      "select",
      difficultySchema,
      "Difficulty",
      blog?.mainTag ?? blogTags[0],
      { selectOptions: ["easy", "medium", "hard"] }
    )
  )[0];
}

export function useCookTimeField(blog?: Blog) {
  return useState(
    createField<number, number>(
      "number",
      cookTimeSchema,
      "Cooking Time(minutes)",
      blog?.cookTime ?? 1,
      { min: 1, step: 1 }
    )
  )[0];
}

export function usePrepTimeField(blog?: Blog) {
  return useState(
    createField<number, number>(
      "number",
      prepTimeSchema,
      "Preparation Time(minutes)",
      blog?.prepTime ?? 1,
      { min: 1, step: 1 }
    )
  )[0];
}

export function useCaloriesField(blog?: Blog) {
  return useState(
    createField<number, number>(
      "number",
      caloriesSchema,
      "Calories",
      blog?.calories ?? 1,
      { step: 1, min: 1 }
    )
  )[0];
}
