import { createSlice } from "@reduxjs/toolkit";

const AuthorSlice = createSlice({
    name: "Author_slice",
    initialState: {
        user: "",
    },
    reducers: {
        AboutAtuhorSlice: (state, action) => {
            state.user = action.payload;
        }
    }
})


export const { AboutAtuhorSlice } = AuthorSlice.actions;
export default AuthorSlice.reducer;