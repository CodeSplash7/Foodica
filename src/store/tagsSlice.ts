import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "@/httpService";

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const res = await http.get("tags/api");
  return res.data;
});

type TagsState = {
  tags: string[];
  loading: boolean;
  error: null | string;
};

const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null
};

export const tagsSlice = createSlice({
  initialState,
  name: "blogs",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        if (!action.error.message) state.error = null;
        if (action.error.message) state.error = action.error.message;
      });
  }
});

export const {} = tagsSlice.actions;
export const tagsReducer = tagsSlice.reducer;
