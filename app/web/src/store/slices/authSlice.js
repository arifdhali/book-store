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
            switch (action?.payload?.role) {
                case 'admin':
                    state.isAdmin = action.payload?.status;
                    break;

                case 'author':
                    state.isAuthor = action.payload?.status;
                    break;

                default:
                    console.warn("Unknown role:", action.payload?.role);
            }
            state.role = action.payload?.role;
        }


    }
})
export const { login } = authSlice.actions;
export default authSlice.reducer
