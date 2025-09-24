import { configureStore } from "@reduxjs/toolkit"

import themeReducer from "../features/theme/themeSlice"
import uiReducer from "../features/ui/uiSlice"

import projectReducer from "../features/project/projectSlice"
import skillReducer from "../features/skill/skillSlice"

import authReducer from "../features/auth/authSlice"
import authApi from "../features/auth/authApi"

import projectApi from "../features/project/projectApi"
import messageApi from "../features/messages/messageApi"

import skillApi from "../features/skill/skillApi"
import eduApi from "../features/education/eduApi"
import experienceApi from "../features/experience/experienceApi"

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        ui: uiReducer,
        projects: projectReducer,
        skills: skillReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [skillApi.reducerPath]: skillApi.reducer,
        [eduApi.reducerPath]: eduApi.reducer,
        [experienceApi.reducerPath]: experienceApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(
        authApi.middleware,
        skillApi.middleware,
        eduApi.middleware,
        experienceApi.middleware,
        projectApi.middleware,
        messageApi.middleware
    ),
})

export default store