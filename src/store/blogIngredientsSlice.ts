import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type InitialState = { checkList: boolean[] };

const initialState: InitialState = {
  checkList: [false, false, false]
};

export const blogIngredientsSlice = createSlice({
  initialState,
  name: "blog-ingredients-state",
  reducers: {
    setCheckList: (state, action: PayloadAction<number>) => {
      state.checkList = [];
      for (let i = 0; state.checkList.length < action.payload; i++) {
        state.checkList.push(false);
      }
    },
    checkIngredient: (state, action: PayloadAction<number>) => {
      const oldCheckList = state.checkList;
      const newCheckList = oldCheckList.map((checkMark, index) =>
        index === action.payload ? !checkMark : checkMark
      );
      state.checkList = newCheckList;
    }
  }
});

export const { setCheckList, checkIngredient } = blogIngredientsSlice.actions;
export const blogIngredientsReducer = blogIngredientsSlice.reducer;
