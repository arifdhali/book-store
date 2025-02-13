import { createSlice } from "@reduxjs/toolkit";

const AuthorSlice = createSlice({
    name: "Author_slice",
    initialState: {
        user: '',
    },
    reducers: {
        setAuthor: (state, action) => {
            const { type, data } = action.payload;
            switch (type) {
                case "first_login":
                    state.user = data;
                    break;
                case "update_profile_photo":
                    state.user = {
                        ...state.user,
                        profile_img: data,
                    }
                    break;
                default:
                    state.user = data;
            }
        },
    }
})


export const { setAuthor, updateProfile } = AuthorSlice.actions;
export default AuthorSlice.reducer;