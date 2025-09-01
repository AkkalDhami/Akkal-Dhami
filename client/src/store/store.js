import { configureStore } from "@reduxjs/toolkit"
import projectApi from "../features/projectApi"
import skillApi from "../features/skillApi"

import themeReducer from "../features/themeSlice"

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [skillApi.reducerPath]: skillApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware, skillApi.middleware)
})
console.log(store.getState());