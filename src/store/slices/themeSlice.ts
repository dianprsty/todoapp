import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { constants } from "../../lib/constants/constants";

interface ThemeState {
  value: string;
}

const initialState: ThemeState = {
  value:
    localStorage.getItem(constants.THEME_STORE_KEY) === "dark"
      ? "dark"
      : "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toogleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
      localStorage.setItem(constants.THEME_STORE_KEY, state.value);
    },
  },
});

export const { toogleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.value;

export default themeSlice.reducer;
