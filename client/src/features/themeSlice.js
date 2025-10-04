import { createSlice } from "@reduxjs/toolkit";

function loadFromLocalStorage() {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch (error) {
    console.error("Error loading theme from localStorage", error);
    return "light";
  }
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: loadFromLocalStorage(),
  },
  reducers: {
    cycleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { cycleMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;
