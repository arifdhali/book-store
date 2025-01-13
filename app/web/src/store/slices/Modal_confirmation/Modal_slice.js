import { createSlice } from "@reduxjs/toolkit";

const ModalConfirmation = createSlice({
    name: "Modal_slice",
    initialState: {
        id: "",
        type: "",
        url: "",
    },
    reducers: {
        DeleteModal: (state, action) => {

        }
    }

})

export const { DeleteModal } = ModalConfirmation.actions;
export default DeleteModal.reducers;