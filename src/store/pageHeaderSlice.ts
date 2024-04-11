import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchTags } from "./tagsSlice";

export type LetterSymbol = "F" | "O1" | "O2" | "D" | "I" | "C" | "A";
type LogoLetter = {
  height: number;
  width: number;
  pathData: string | string[];
  fill: string;
  activtesLetter: LetterSymbol;
};

export type Link = {
  id: number;
  href: string;
  label: string;
  links?: number[];
  isOpen?: boolean;
  isContained: boolean;
};

export type pageHeaderState = {
  searchbar: {
    isOpen: boolean;
    textSearch: string;
  };
  navigationMenu: {
    links: Link[];
    isBurgerMenuOpen: boolean;
  };
  logo: {
    lOGO_LETTER_SPACING: `${number}px`;
    normalLetterColor: string;
    hoverLetterColor: string;
    letters: {
      F: LogoLetter;
      O1: LogoLetter;
      O2: LogoLetter;
      D: LogoLetter;
      I: LogoLetter;
      C: LogoLetter;
      A: LogoLetter;
    };
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
      { id: 1, href: "", label: "HOME", isContained: false },
      { id: 2, href: "", label: "ABOUT", isContained: false },
      {
        id: 3,
        href: "",
        label: "RECIPE INDEX",
        isOpen: false,
        links: [],
        isContained: false
      },
      { id: 4, href: "", label: "CONTACT", isContained: false }
    ]
  },
  logo: {
    lOGO_LETTER_SPACING: "3px",
    normalLetterColor: "#363940",
    hoverLetterColor: "white",
    letters: {
      F: {
        height: 94,
        width: 61,
        pathData:
          "M49.3332 0.933006C47.8665 1.19967 37.3332 3.59967 25.9999 6.26633C1.86652 11.733 -1.60014 13.733 1.33319 20.533C2.39986 22.933 4.26652 38.3997 5.86652 57.5997C7.33319 75.733 8.79986 91.1997 9.33319 91.9997C9.73319 92.6663 11.0665 93.333 12.1332 93.333C13.5999 93.333 13.9999 89.9997 13.9999 74.7997V56.2663L23.7332 53.333C28.9332 51.733 36.6665 49.4663 40.6665 48.2663C49.9999 45.5997 51.3332 44.3997 46.5332 43.1997C43.9999 42.533 37.9999 43.4663 28.7999 45.733C21.0665 47.733 14.2665 48.7997 13.7332 48.2663C10.5332 45.0663 8.93319 21.8663 11.7332 18.3997C13.1999 16.3997 47.5999 6.26633 56.6665 5.06634C58.5332 4.79967 60.1332 3.59967 60.3999 2.26633C60.7999 0.533005 59.9999 -0.000328064 56.3999 0.133003C53.9999 0.266335 50.7999 0.533005 49.3332 0.933006Z",
        fill: "#363940",
        activtesLetter: "D"
      },
      O1: {
        height: 65,
        width: 44,
        pathData:
          "M15.7333 2.86633C4.93328 9.533 -2.26672 34.333 2.13328 50.333C4.26661 57.933 11.1999 64.333 17.1999 64.333C26.5333 64.333 37.1999 56.333 41.5999 46.0663C43.9999 40.1997 43.7333 24.8663 41.1999 17.133C39.9999 13.6663 36.7999 8.46633 33.9999 5.533C28.2666 -0.467003 22.6666 -1.26701 15.7333 2.86633ZM31.7333 10.1997C36.3999 14.4663 39.8666 26.8663 38.7999 34.8663C37.5999 43.533 33.0666 51.933 27.5999 55.6663C13.1999 65.533 2.13328 52.1997 6.66661 30.733C8.93328 19.933 11.3333 14.9997 16.6666 10.4663C21.8666 6.06633 27.1999 6.06633 31.7333 10.1997Z",
        fill: "#363940",
        activtesLetter: "I"
      },
      O2: {
        height: 65,
        width: 44,
        pathData:
          "M15.7333 2.86633C4.93328 9.533 -2.26672 34.333 2.13328 50.333C4.26661 57.933 11.1999 64.333 17.1999 64.333C26.5333 64.333 37.1999 56.333 41.5999 46.0663C43.9999 40.1997 43.7333 24.8663 41.1999 17.133C39.9999 13.6663 36.7999 8.46633 33.9999 5.533C28.2666 -0.467003 22.6666 -1.26701 15.7333 2.86633ZM31.7333 10.1997C36.3999 14.4663 39.8666 26.8663 38.7999 34.8663C37.5999 43.533 33.0666 51.933 27.5999 55.6663C13.1999 65.533 2.13328 52.1997 6.66661 30.733C8.93328 19.933 11.3333 14.9997 16.6666 10.4663C21.8666 6.06633 27.1999 6.06633 31.7333 10.1997Z",
        fill: "#363940",
        activtesLetter: "C"
      },
      D: {
        height: 107,
        width: 43,
        pathData:
          "M38.733 0.599648C37.3997 1.13298 36.9997 9.26631 36.9997 35.7996V70.4663L31.7997 66.333C18.733 55.7997 4.86634 62.1996 0.999678 80.5997C-1.66699 92.5997 3.79968 103.266 13.7997 105.8C20.1997 107.4 34.0663 105.666 37.933 102.733C41.6663 100.066 41.6663 99.933 41.933 82.1997C42.5997 50.0663 40.5997 0.0663147 38.733 0.599648ZM26.333 67.6663C30.8663 70.0663 35.7997 80.4663 36.5997 88.8663C37.2663 95.933 36.9997 96.8663 34.1997 98.8663C32.0663 100.333 28.1997 101 21.933 101C10.8663 101 6.99968 98.0663 5.66634 88.4663C4.33301 80.1996 5.66635 76.0663 10.9997 70.733C15.6663 66.0663 21.2663 64.9997 26.333 67.6663Z",
        fill: "#363940",
        activtesLetter: "A"
      },
      I: {
        height: 84,
        width: 15,
        pathData: [
          "M0.4 5.59967C0.8 11.1997 0.933333 11.333 5.46667 11.333C9.2 11.333 10.2667 10.6663 11.3333 7.86634C13.3333 2.13301 11.6 -0.000326112 5.46667 -0.000326112H0L0.4 5.59967Z",
          "M8.1333 43.0667C8.1333 50 8.5333 62 9.06663 69.7333C9.7333 82.4 10.1333 84 12.4 84C15.3333 84 15.4666 80 13.2 50.9333C12.1333 35.6 11.3333 30.6667 9.86663 30.6667C8.5333 30.6667 8.1333 33.6 8.1333 43.0667Z"
        ],
        fill: "#363940",
        activtesLetter: "F"
      },
      C: {
        height: 59,
        width: 46,
        pathData:
          "M17.9997 0.866337C13.5997 2.86634 6.93303 10.5997 3.86636 17.6663C1.73303 22.4663 0.799692 26.9997 0.799692 33.7997C0.666359 41.7997 1.19969 43.933 4.26636 48.5997C8.26636 54.5997 14.7997 58.333 21.5997 58.333C29.1997 58.333 39.5997 54.5997 42.533 50.733C48.133 43.7997 45.5997 43.2663 33.333 49.133C23.9997 53.533 15.9997 54.4663 12.3997 51.533C8.79969 48.4663 5.33303 39.3997 5.33303 32.5997C5.33303 20.4663 15.4664 4.99967 23.4664 4.99967C27.1997 4.99967 29.8664 9.533 31.333 17.933C32.6664 26.4663 34.6664 24.8663 34.6664 15.2663C34.6664 3.79967 32.6664 0.466339 25.9997 0.0663376C23.0664 -0.0669937 19.4664 0.333004 17.9997 0.866337Z",
        fill: "#363940",
        activtesLetter: "O1"
      },
      A: {
        height: 65,
        width: 42,
        pathData:
          "M15.6001 1.53319C10.5334 2.86652 6.00011 6.59985 6.00011 9.39986C6.00011 11.6665 8.80011 11.2665 18.4001 7.53319C25.7334 4.73319 27.8668 5.39985 31.8668 12.3332C33.7334 15.5332 34.5334 20.0665 35.0668 29.9332L35.7334 43.2665L30.5334 40.4665C24.4001 37.1332 13.0668 36.7332 7.46677 39.5332C1.60011 42.5999 -1.19989 51.6665 2.00011 57.7999C4.80011 62.9999 10.9334 64.7332 22.9334 63.9332C29.0668 63.5332 35.7334 62.3332 37.7334 61.3999C40.9334 59.7999 41.3334 58.8665 41.7334 51.6665C42.2668 42.9999 40.0001 21.2665 37.8668 13.3999C35.2001 3.13319 26.9334 -1.26682 15.6001 1.53319ZM29.8668 46.4665C32.1334 48.3332 34.0001 50.9999 34.0001 52.4665C34.0001 58.5999 19.3334 62.1999 11.3334 58.0665C5.86677 55.2665 4.80011 51.9332 8.26677 48.0665C13.7334 41.9332 23.7334 41.2665 29.8668 46.4665Z",
        fill: "#363940",
        activtesLetter: "O2"
      }
    }
  }
};

export const pageHeaderSlice = createSlice({
  initialState,
  name: "header-state",
  reducers: {
    useHoverLetter(state, action: PayloadAction<LetterSymbol>) {
      const letterTargetted = state.logo.letters[action.payload];
      letterTargetted.fill = state.logo.hoverLetterColor;
    },
    useNormalLetter(state, action: PayloadAction<LetterSymbol>) {
      const letterTargetted = state.logo.letters[action.payload];
      letterTargetted.fill = state.logo.normalLetterColor;
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      const recipeIndexLink = state.navigationMenu.links.find(
        (l) => l.id === 3
      );
      const newLinks: Link[] = action.payload.map((l: string) => {
        let newLink: Link = {
          id: Number(generateNumericId()),
          href: `blogs?t=${l.toLowerCase()}`,
          label: l,
          isContained: true
        };
        return newLink;
      });
      recipeIndexLink!.links = newLinks.map((l) => l.id);
      state.navigationMenu.links = state.navigationMenu.links.concat(newLinks);
    });
  }
});

export const {
  useHoverLetter,
  useNormalLetter,
  openDropDownMenu,
  closeDropDownMenu,
  openBurgerMenu,
  closeBurgerMenu,
  openSearchBar,
  closeSearchBar,
  setTextSearch
} = pageHeaderSlice.actions;
export const pageHeaderReducer = pageHeaderSlice.reducer;

function generateNumericId(): string {
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += Math.floor(Math.random() * 10); // Generates random number between 0 and 9
  }
  return result;
}
