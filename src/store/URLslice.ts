import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type URLstate = {
  url: string;
};

const initialState: URLstate = {
  url: ""
};

export const URLslice = createSlice({
  initialState,
  name: "url-state",
  reducers: {
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    }
  }
});

export const { setUrl } = URLslice.actions;
export const URLreducer = URLslice.reducer;
