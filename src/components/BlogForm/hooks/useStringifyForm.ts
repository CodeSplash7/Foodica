import { InputFields } from "./useInputFields";

export function useStringifyForm(
  author: string,
  blogDate: string,
  inputFields: InputFields
) {
  const {
    titleField,
    mainTagField,
    secondaryTagsField,
    descField,
    servingsField,
    ingredientsField,
    directionsField,
    conclusionField,
    difficultyField,
    cookTimeField,
    prepTimeField,
    caloriesField
  } = inputFields;
  return (recipePicture: {
    url: string;
    thumbnailUrl: string | null;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
  }) =>
    JSON.stringify({
      picture: recipePicture,
      title: titleField.getCorrectValue(),
      author,
      mainTag: mainTagField.getCorrectValue(),
      secondaryTags: secondaryTagsField.getCorrectValue(),
      description: descField.getCorrectValue(),
      difficulty: difficultyField.getCorrectValue(),
      servings: servingsField.getCorrectValue(),
      prepTime: prepTimeField.getCorrectValue(),
      cookTime: cookTimeField.getCorrectValue(),
      calories: caloriesField.getCorrectValue(),
      ingredients: ingredientsField.getCorrectValue(),
      directions: directionsField.getCorrectValue(),
      conclusion: conclusionField.getCorrectValue(),
      creationDate: blogDate
    });
}
