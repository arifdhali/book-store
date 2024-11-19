import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        isAuthorized: false,
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