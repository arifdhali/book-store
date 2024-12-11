import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import authorReducer from "./slices/author/AuthorSlice"

const store = configureStore({
    reducer: {
        authentication: authReducer,
        authors: authorReducer,
    }
})

export default store;