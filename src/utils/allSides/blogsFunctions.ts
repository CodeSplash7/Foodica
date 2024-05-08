import { StaticImageData } from "next/image";

type RecipeDifficulty = "easy" | "medium" | "hard";
type IngredientUnit =
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
  // informal
  | "dash"
  | "smidgen"
  | "handful"
  | "sprig"
  | "bunch"
  | "clove"
  | "slice"
  | "pinch";

type Ingredient = {
  id: number;
  unit?: IngredientUnit;
  quantity: number;
  name: string;
  details?: string;
};

export type BlogComment = { userId: number; message: string };

export type Blog = {
  id: number;
  image: StaticImageData;
  title: string;
  author: string;
  creationDate: string;
  mainTag: string;
  secondaryTags: string[];
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
  tag: string | null,
  search: string | null,
  year?: string,
  month?: string,
  day?: string
) => {
  return blogs.filter((blog) => {
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

    return tagFilter && keywordFilter && yearFilter && monthFilter && dayFilter;
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

const blogTags = [
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

export const getBlogTags = () => blogTags;
