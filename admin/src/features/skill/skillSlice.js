import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    skills: [{
        id: "1",
        name: "React",
        description: "JavaScript library",
        category: "Frontend",
        icon: {
            name: "React",
            component: "SiReact",
            color: "#61DAFB",
        },
    },
    {
        id: "2",
        name: "Node.js",
        description: "JS runtime environment",
        category: "Backend",
        icon: {
            name: "Node",
            component: "SiNodedotjs",
            color: "#339933"
        },
    },],
};

const skillSlice = createSlice({
    name: "skills",
    initialState,
    reducers: {
        addSkill: (state, action) => {
            state.skills.push({ id: Date.now(), ...action.payload });
        },
        editSkill: (state, action) => {
            const { id, data } = action.payload;
            console.log(action.payload);
            const index = state.skills.findIndex((s) => s.id === id);
            if (index !== -1) {
                state.skills[index] = { ...state.skills[index], ...data };
            }
        },
        deleteSkill: (state, action) => {
            const id = action.payload;
            state.skills = state.skills.filter((s) => s.id !== id);
        },
        getSkillById: (state, action) => {
            const id = action.payload;
            return state.skills.find((s) => s.id === id);
        },

    },
});


export const { addSkill, editSkill, deleteSkill, getSkillById } = skillSlice.actions;

export default skillSlice.reducer;