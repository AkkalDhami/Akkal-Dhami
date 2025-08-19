import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "../features/theme/themeSlice"
import uiReducer from "../features/ui/uiSlice"

import projectReducer from "../features/project/projectSlice"
import skillReducer from "../features/skill/skillSlice"

import authReducer from "../features/auth/authSlice"
import authApi from "../features/auth/authApi"
import projectApi from "../features/project/projectApi"
import skillApi from "../features/skill/skillApi"

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        ui: uiReducer,
        projects: projectReducer,
        skills: skillReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [skillApi.reducerPath]: skillApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(
        authApi.middleware,
        skillApi.middleware,
        projectApi.middleware
    ),
})
console.log(store.getState());
export default store