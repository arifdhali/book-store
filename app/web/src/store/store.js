import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import AuthorSlice from "./slices/author/AuthorSlice";
import Modal_slice from "./slices/Modal_confirmation/Modal_slice";

const store = configureStore({
    reducer: {
        authentication: authReducer,
        authors: AuthorSlice,
        modals: Modal_slice
    }
})

export default store;