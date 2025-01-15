import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify';

const ConfirmModal = ({ modal, onSuccess }) => {
    const { api_url, type } = modal;
    const handelDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_API_URL}${api_url}`)
                .then((res) => {
                    if (res.data.status) {
                        toast.success(res.data?.message)
                        if (onSuccess) onSuccess();
                    }else{
                        toast.error(res.data?.message)
                    }
                })
        } catch (error) {
            console.log(error);
            toast.success(res.error?.data.message)
        }

    }
    return (
        <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Delete
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">Are you sure ?</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handelDelete}>
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal