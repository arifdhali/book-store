import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
const store = configureStore({
    reducer: {
        authentication: authReducer,
    }
})

export default store;