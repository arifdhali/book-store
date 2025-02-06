import { createSlice } from "@reduxjs/toolkit";

const Notifications = createSlice({
    name: 'author_notifications',
    initialState: {
        list: [],
    },
    reducers: {
        setNotifications: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.list = [...action.payload, ...state.list];
            } else {
                state.list = action?.payload;
            }
        }
    }
})

export const { setNotifications } = Notifications.actions;
export default Notifications.reducer;