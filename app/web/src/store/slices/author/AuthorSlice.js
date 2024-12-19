import { createSlice } from "@reduxjs/toolkit";

const AuthorSlice = createSlice({
    name: "Author slice",
    initialState: {
        subscription_type: null || ""
    },
    reducers: {
        LoginSlice: (state, action) => {
            const { userinfo } = action.payload;
            state.subscription_type = userinfo.subscription_type;
        }
    }
})


export const { LoginSlice } = AuthorSlice.actions;
export default AuthorSlice.reducer;