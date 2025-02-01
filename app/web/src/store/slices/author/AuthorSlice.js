import { createSlice } from "@reduxjs/toolkit";

const AuthorSlice = createSlice({
    name: "Author_slice",
    initialState: {
        user: "",
    },
    reducers: {
        setAuthor: (state, action) => {            
            state.user = action?.payload;
        }
    }
})


export const { setAuthor } = AuthorSlice.actions;
export default AuthorSlice.reducer;