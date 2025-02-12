import { createSlice } from "@reduxjs/toolkit";

const AuthorSlice = createSlice({
    name: "Author_slice",
    initialState: {
        user: "",
        user_profile: ""
    },
    reducers: {
        setAuthor: (state, action) => {
            state.user = action?.payload
        },
        updateProfile: (state, action) => {
            state.user_profile = action.payload
        }
    }
})


export const { setAuthor, updateProfile } = AuthorSlice.actions;
export default AuthorSlice.reducer;