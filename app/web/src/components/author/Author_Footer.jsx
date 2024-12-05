import React, { useRef, useState } from "react";
import AppRoutes from "../../routes/routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTH.AUTHOR.LOGOUT}`,
                {},
                { withCredentials: true }
            );
            if (response?.data?.status) {
                navigate(AppRoutes.AUTH.AUTHOR.LOGIN);
            } else {
                console.error("Logout failed:", response?.data?.message);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <>
            <footer className="m-4">
                <p>Copyrights @Arif Dhali</p>
            </footer>

            <div
                className="modal fade"
                id="LogoutAuthor"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="LogoutAuthorLabel"
                aria-hidden="true"

            >
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="LogoutAuthorLabel">
                                Confirmations
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"

                            />
                        </div>
                        <div className="modal-body">Are you sure you want to logout?</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
