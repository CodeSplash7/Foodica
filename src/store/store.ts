import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import { pageHeaderReducer } from "@/store/pageHeaderSlice";
import { blogsReducer } from "./blogsSlice";
import { URLreducer } from "./URLslice";

export const store = configureStore({
  reducer: { pageHeader: pageHeaderReducer, blogs: blogsReducer, url: URLreducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
