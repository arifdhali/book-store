import { createSlice } from "@reduxjs/toolkit";

const Notifications = createSlice({
    name: 'author_notifications',
    initialState: {
        list: [],
    },
    reducers: {
        setNotifications: (state, action) => {
            const { payload } = action;
            if (Array.isArray(payload)) {
                state.list = [...payload, ...state.list]
            }

        },
        setClearNotifications: (state, action) => {
            const { payload } = action;
            state.list = [...payload];
        }
    }
})

export const { setNotifications, setClearNotifications } = Notifications.actions;
export default Notifications.reducer;