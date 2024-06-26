"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import { pageHeaderReducer } from "@/store/pageHeaderSlice";
import { blogIngredientsReducer } from "./blogIngredientsSlice";

export const store = configureStore({
  reducer: {
    pageHeader: pageHeaderReducer,
    blogIngredients: blogIngredientsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
