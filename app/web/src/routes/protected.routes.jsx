import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const ProtectedRoutes = ({ children, roleOfUser }) => {
    const navigate = useNavigate();
    const token = Cookies.get("ADMIN_TOKEN");
    const authorToken = Cookies.get("AUTHOR_TOKEN");



    const isAuthenticated = useSelector((state) => state.authentication);
    const { isAdmin, isAuthor, role } = isAuthenticated;

    if (roleOfUser == 'author') {
        if (!authorToken) {
            return <Navigate to={`/${roleOfUser}/login`} />;
        }
    }
    if (roleOfUser == 'admin') {
        if (!token) {
            return <Navigate to={`/${roleOfUser}/login`} />;
        }
    }


    return children;
}

export default ProtectedRoutes;