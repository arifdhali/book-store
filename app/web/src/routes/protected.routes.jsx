import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Cookies from "js-cookie";


const ProtectedRoutes = ({ children, role }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get("ADMIN_TOKEN");
        if (!token) {
            navigate("/admin/login");
        }

    }, [navigate])
    const isAuthenticated = useSelector((state) => state.authentication?.isAuthorized);
    if (!isAuthenticated) {
        return <Navigate to={`/${role}/login`} />;
    }
    return children;
}

export default ProtectedRoutes;