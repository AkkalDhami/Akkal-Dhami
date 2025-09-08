import { createSlice } from "@reduxjs/toolkit";

function loadFromLocalStorage() {
    try {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme; // "light" or "dark"
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            try {
                localStorage.setItem("theme", state.mode);
            } catch (error) {
                console.error("Error saving theme to localStorage", error);
            }
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
            try {
                localStorage.setItem("theme", state.mode);
            } catch (error) {
                console.error("Error saving theme to localStorage", error);
            }
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
