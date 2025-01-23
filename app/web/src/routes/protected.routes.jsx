import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { AboutAtuhorSlice } from '../store/slices/author/AuthorSlice';

const ProtectedRoutes = ({ children, roleOfUser }) => {
    const adminToken = Cookies.get("ADMIN_TOKEN");
    const authorToken = Cookies.get("AUTHOR_TOKEN");
    const dispatch = useDispatch();
    if (roleOfUser == 'author') {
        if (!authorToken) {
            return <Navigate to={`/${roleOfUser}/login`} />;
        }
        const decode = jwtDecode(authorToken);
        dispatch(AboutAtuhorSlice(decode.user.data));        
    }
    if (roleOfUser == 'admin') {
        if (!adminToken) {
            return <Navigate to={`/${roleOfUser}/login`} />;
        }
    }
    return children;

}

export default ProtectedRoutes;