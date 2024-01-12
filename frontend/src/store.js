// This file is basically the entry point for the Redux.
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlices"

// Entry point for redux. A store is a JavaScript object with a few special functions and abilities that make 
// it different than a plain global object.
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store