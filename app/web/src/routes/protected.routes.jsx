import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const ProtectedRoutes = ({ children, role }) => {
    const isAuthenticated = useSelector((state) => state.authentication?.isAuthorized);
    const token = Cookies.get('ADMIN_TOKEN');    
    if (!isAuthenticated & !token) {
        return <Navigate to={`/${role}/login`} />;
    }
    return children;
}

export default ProtectedRoutes;