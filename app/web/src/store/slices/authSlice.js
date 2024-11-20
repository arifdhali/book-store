import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthorized: Cookies.get('ADMIN_TOKEN') || false,
        role: null,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthorized = action.payload?.status,
                state.role = action.payload?.role
        }

    }
})
export const { login } = authSlice.actions;
export default authSlice.reducer