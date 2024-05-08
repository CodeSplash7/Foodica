import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type LogoLetterIdentity = {
  id: number;
  fill: string;
};

export type LinkIdentity = {
  id: number;
  isOpen?: boolean;
};

export type pageHeaderState = {
  searchbar: {
    isOpen: boolean;
    textSearch: string;
  };
  navigationMenu: {
    links: LinkIdentity[];
    isBurgerMenuOpen: boolean;
  };
  logo: {
    letters: LogoLetterIdentity[];
  };
};

const initialState: pageHeaderState = {
  searchbar: {
    isOpen: false,
    textSearch: ""
  },
  navigationMenu: {
    isBurgerMenuOpen: false,
    links: [
      { id: 1 },
      { id: 2 },
      {
        id: 3,
        isOpen: false
      },
      { id: 4 }
    ]
  },
  logo: {
    letters: [
      {
        id: 0,
        fill: "#363940"
      },
      {
        id: 1,
        fill: "#363940"
      },
      {
        id: 2,
        fill: "#363940"
      },
      {
        id: 3,
        fill: "#363940"
      },
      {
        id: 4,
        fill: "#363940"
      },
      {
        id: 5,
        fill: "#363940"
      },
      {
        id: 6,
        fill: "#363940"
      }
    ]
  }
};
const defaultLetterColor = "#363940";
const hoverLetterColor = "white";
export const pageHeaderSlice = createSlice({
  initialState,
  name: "header-state",
  reducers: {
    hoverLetterWithIndex(state, action: PayloadAction<number>) {
      const letter = state.logo.letters.find((l) => l.id === action.payload);
      if (!letter) return;
      letter.fill = hoverLetterColor;
    },
    unhoverLetterWithIndex(state, action: PayloadAction<number>) {
      const letter = state.logo.letters.find((l) => l.id === action.payload);
      if (!letter) return;
      letter.fill = defaultLetterColor;
    },
    openDropDownMenu(state, action: PayloadAction<number | undefined>) {
      if (!action.payload) return;
      const target = state.navigationMenu.links.find(
        (link) => link.id === action.payload
      );
      if (!target) throw new Error("menu not found");
      target.isOpen = true;
    },
    closeDropDownMenu(state, action: PayloadAction<number | undefined>) {
      if (!action.payload) return;

      const target = state.navigationMenu.links.find(
        (link) => link.id === action.payload
      );
      if (!target) throw new Error("menu not found");
      target.isOpen = false;
    },
    openBurgerMenu(state) {
      state.navigationMenu.isBurgerMenuOpen = true;
    },
    closeBurgerMenu(state) {
      state.navigationMenu.isBurgerMenuOpen = false;
    },
    openSearchBar(state) {
      state.searchbar.isOpen = true;
    },
    closeSearchBar(state) {
      state.searchbar.isOpen = false;
    },
    setTextSearch(state, action: PayloadAction<string>) {
      state.searchbar.textSearch = action.payload;
    }
  }
});

export const {
  hoverLetterWithIndex,
  unhoverLetterWithIndex,
  openDropDownMenu,
  closeDropDownMenu,
  openBurgerMenu,
  closeBurgerMenu,
  openSearchBar,
  closeSearchBar,
  setTextSearch
} = pageHeaderSlice.actions;
export const pageHeaderReducer = pageHeaderSlice.reducer;
