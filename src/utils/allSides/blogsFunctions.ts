import { Picture, usernameToUrl } from "./usersFunctions";

type RecipeDifficulty = "easy" | "medium" | "hard";
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

export const filterSelectedBlogs = (
  blogs: Blog[],
  tag?: string,
  search?: string,
  author?: string,
  year?: string,
  month?: string,
  day?: string,
  ids?: string[]
) => {
  return blogs.filter((blog) => {
    const authorFilter = author ? usernameToUrl(blog.author) === author : true;
    const idsFilter = ids ? ids.includes(blog.id) : true;
    const tagFilter = tag
      ? blog.mainTag.toLowerCase() === tag.toLowerCase()
      : true;
    const keywordFilter = search
      ? Object.values(blog)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      : true;
    const yearFilter = year
      ? new Date(blog.creationDate).getFullYear() === Number(year)
      : true;
    const monthFilter = month
      ? new Date(blog.creationDate).getMonth() === Number(month) - 1
      : true;
    const dayFilter = day
      ? new Date(blog.creationDate).getDate() === Number(day)
      : true;

    return (
      tagFilter &&
      keywordFilter &&
      yearFilter &&
      monthFilter &&
      dayFilter &&
      idsFilter &&
      authorFilter
    );
  });
};

export const getNthDivision = <T extends any[]>(
  array: T,
  nthDivision: number,
  divisionSize: number
) => {
  const dividedArray = getDivisions(array, divisionSize);
  if (nthDivision > 0 && nthDivision <= dividedArray.length) {
    return dividedArray[nthDivision - 1] as T;
  } else {
    return null;
  }
};

export const getDivisions = (array: any[], divisionSize: number) => {
  let dividedArray = [];
  for (let i = 0; i < array.length; i += divisionSize) {
    dividedArray.push(array.slice(i, i + divisionSize));
  }
  return dividedArray;
};

export const blogTags: BlogTag[] = [
  "Appetizers",
  "Asian",
  "Baking",
  "Beef",
  "Breakfast",
  "Brunch",
  "Budget-Friendly",
  "Chicken",
  "Desserts",
  "Family",
  "Grilling",
  "Healthy",
  "Homemade",
  "International",
  "Italian",
  "Mexican",
  "Party",
  "Pasta",
  "Quick",
  "Salads",
  "Seafood",
  "Seasonal",
  "Slow-Cooker",
  "Snacks",
  "Soups",
  "Vegan",
  "Vegetables",
  "Vegetarian"
];

export const ingredientUnits = [
  "tsp",
  "Tbsp",
  "fl oz",
  "c",
  "pt",
  "qt",
  "gal",
  "ml",
  "L",
  "oz",
  "lb",
  "g",
  "kg",
  "ea",
  "dz",
  "in",
  "cm",
  "piece",
  "unit",
  "item",
  "count",
  "whole",
  "dash",
  "smidgen",
  "handful",
  "sprig",
  "bunch",
  "clove",
  "slice",
  "pinch"
];
