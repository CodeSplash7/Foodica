import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import http from "@/httpService";
import { StaticImageData } from "next/image";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await http.get("blogs/api");
  return res.data;
});

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
  tag: string;
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

type BlogsState = {
  blogs: Blog[];
  loading: boolean;
  error: null | string;
  currentBlogPage: number;
  pagesCount: number;
};

const initialState: BlogsState = {
  currentBlogPage: 0,
  pagesCount: 0,
  blogs: [],
  loading: false,
  error: null
};

export const blogsSlice = createSlice({
  initialState,
  name: "blogs",
  reducers: {
    setCurrentBlogPage(state, action: PayloadAction<number>) {
      state.currentBlogPage = action.payload;
    },
    setPagesCount(state, action: PayloadAction<number>) {
      state.pagesCount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        if (!action.error.message) state.error = null;
        if (action.error.message) state.error = action.error.message;
      });
  }
});

export const { setCurrentBlogPage, setPagesCount } = blogsSlice.actions;
export const blogsReducer = blogsSlice.reducer;
