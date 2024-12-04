import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Cookies from "js-cookie";


const ProtectedRoutes = ({ children, roleOfUser }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get("ADMIN_TOKEN");
        const authorToken = Cookies.get("ADMIN_TOKEN");
        if (!token) {
            navigate("/admin/login");
        }
        if (!authorToken) {
            navigate("/author/login");
        }


    }, [navigate])
    console.log(roleOfUser);
    const isAuthenticated = useSelector((state) => state.authentication);
    const { isAdmin, isAuthor, role } = isAuthenticated;
    console.log(isAuthenticated);
    // if (!isAdmin && role == roleOfUser) {
    //     console.log('admin');
    //     return <Navigate to={`/${roleOfUser}/login`} />;
    // }
    if (!isAuthor && role == roleOfUser) {
        console.log('author');
        return <Navigate to={`/${roleOfUser}/login`} />;
    }
    return children;
}

export default ProtectedRoutes;