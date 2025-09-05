import { configureStore } from "@reduxjs/toolkit"

import projectApi from "../features/projectApi"
import skillApi from "../features/skillApi"
import contactApi from "../features/contactApi"

import themeReducer from "../features/themeSlice"

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [skillApi.reducerPath]: skillApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware, skillApi.middleware, contactApi.middleware)
})
console.log(store.getState());