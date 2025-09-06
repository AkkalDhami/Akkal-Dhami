import { createSlice } from "@reduxjs/toolkit";

import { mockProjects } from "../../data/mockProjects";

const loadFromLocalStorage = () => {
    try {
        const data = localStorage.getItem("projects");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to load projects from localStorage", error);
        return [];
    }
};

const saveToLocalStorage = (projects) => {
    try {
        localStorage.setItem("projects", JSON.stringify(projects));
    } catch (error) {
        console.error("Failed to save projects to localStorage", error);
    }
};

const initialState = {
    projects: mockProjects || loadFromLocalStorage(),
};

const projectSlice = createSlice({
    name: "projects",
    initialState: initialState,
    reducers: {
        addProject: (state, action) => {
            console.log(action.payload);
            state.projects.push({ id: Date.now(), technologies: [{ name: "React", color: "#61DBFB" }], gallery: [], image: "", ...action.payload });
            saveToLocalStorage(state.projects);
        },
        editProject: (state, action) => {
            const { id, data } = action.payload;
            const index = state.projects.findIndex((p) => p.id === id);
            if (index !== -1) {
                state.projects[index] = { ...state.projects[index], ...data };
                saveToLocalStorage(state.projects);
            }
        },
        deleteProject: (state, action) => {
            const id = action.payload;
            state.projects = state.projects.filter((p) => p.id !== id);
            saveToLocalStorage(state.projects);
        },
        setProjects: (state, action) => {
            state.projects = action.payload;
            saveToLocalStorage(state.projects);
        },
    },
});



export const { addProject, editProject, deleteProject, setProjects } = projectSlice.actions;
export default projectSlice.reducer;
