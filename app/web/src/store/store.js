import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import AuthorSlice from "./slices/author/AuthorSlice";

const store = configureStore({
    reducer: {
        authentication: authReducer,
        authors: AuthorSlice,
    }
})

export default store;
