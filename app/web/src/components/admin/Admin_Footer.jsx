import React, { useRef, useState } from "react";
import AppRoutes from "../../routes/routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const [logout, setLogout] = useState(false);

    const handleLogout = async (e) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTH.ADMIN.LOGOUT}`,
                {},
                { withCredentials: true }
            );

            if (response?.data?.status) {
                setLogout(true);
                // navigate(AppRoutes.AUTH.ADMIN.LOGIN);
            } else {
                console.error("Logout failed:", response?.data?.message);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <>
            <footer>
                <p>Copyrights @Arif Dhali</p>
            </footer>

            <div
                className="modal fade"
                id="Logout"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="LogoutLabel"
                aria-hidden="true"

            >
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="LogoutLabel">
                                Confirmations
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss={logout ? "modal" : undefined}
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
