import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, role }) => {
    const isAuthenticated = useSelector((state) => state.authentication.isAuthorized);    
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to={`/${role}/login`} />;
    }
    return children;
}

export default ProtectedRoutes;