import { Picture } from "./user-types";

export type RecipeDifficulty = "easy" | "medium" | "hard";

export type BlogTag =
  | "Appetizers"
  | "Asian"
  | "Baking"
  | "Beef"
  | "Breakfast"
  | "Brunch"
  | "Budget-Friendly"
  | "Chicken"
  | "Desserts"
  | "Family"
  | "Grilling"
  | "Healthy"
  | "Homemade"
  | "International"
  | "Italian"
  | "Mexican"
  | "Party"
  | "Pasta"
  | "Quick"
  | "Salads"
  | "Seafood"
  | "Seasonal"
  | "Slow-Cooker"
  | "Snacks"
  | "Soups"
  | "Vegan"
  | "Vegetables"
  | "Vegetarian";
export type IngredientUnit =
  | "tsp"
  | "Tbsp"
  | "fl oz"
  | "c"
  | "pt"
  | "qt"
  | "gal"
  | "ml"
  | "L"
  | "oz"
  | "lb"
  | "g"
  | "kg"
  | "ea"
  | "dz"
  | "in"
  | "cm"
  | "piece"
  | "unit"
  | "item"
  | "count"
  | "whole"
  // informal
  | "dash"
  | "smidgen"
  | "handful"
  | "sprig"
  | "bunch"
  | "clove"
  | "slice"
  | "pinch";

export type Ingredient = {
  unit?: IngredientUnit;
  quantity: number;
  name: string;
  details?: string;
};

export type BlogComment = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
  replies: BlogReply[];
};

export type BlogReply = {
  id: string;
  parentId: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
};

export type Blog = {
  id: string;
  picture: Picture;
  title: string;
  author: string;
  creationDate: string;
  mainTag: BlogTag;
  secondaryTags: BlogTag[];
  description: string;
  difficulty: RecipeDifficulty;
  servings: number;
  prepTime: number;
  cookTime: number;
  calories: number;
  ingredients: Ingredient[];
  directions: string[];
  conclusion: string;
  comments: BlogComment[];
};

export type BlogListFilters = [
  tag: string | undefined,
  search: string | undefined,
  author: string | undefined,
  year: string | undefined,
  month: string | undefined,
  day: string | undefined,
  ids: string[] | undefined
];
