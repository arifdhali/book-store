import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import AuthorSlice from "./slices/author/AuthorSlice";
import Notifications from "./slices/Notification";

const store = configureStore({
    reducer: {
        authentication: authSlice,
        authors: AuthorSlice,
        Notifications: Notifications,
    }
})

export default store;
