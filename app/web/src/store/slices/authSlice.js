import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAdmin: Cookies.get('ADMIN_TOKEN') || false,
        isAuthor: Cookies.get('AUTHOR_TOKEN') || false,
        role: null,
    },
    reducers: {
        login: (state, action) => {
            state.role = action.payload?.role;
            if (action?.payload?.role == 'admin') {
                state.isAdmin = action.payload?.status;
            }
            if (action?.payload?.role == 'author') {
                state.isAuthor = action.payload?.status;
            }
        }

    }
})
export const { login } = authSlice.actions;
export default authSlice.reducer
