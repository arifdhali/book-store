import React, { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setAuthor } from '@/store/slices/author/AuthorSlice';
import AppRoutes from "@/routes/routes"
import axios from 'axios';

const ProtectedRoutes = ({ children, roleOfUser }) => {
    const adminToken = Cookies.get("ADMIN_TOKEN");
    const authorToken = Cookies.get("AUTHOR_TOKEN");
    const dispatch = useDispatch();
    
    async function getAuthorInformation() {
        let response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.BASE}`)
        if (response.data.status) {
            dispatch(setAuthor(response.data?.authors))
        }
    }
    if (roleOfUser == 'author') {
        if (!authorToken) {
            return <Navigate to={`/${roleOfUser}/login`} />;
        }
        getAuthorInformation();

    }
    if (roleOfUser == 'admin') {
        if (!adminToken) {
            return <Navigate to={`/${roleOfUser}/login`} />;
        }
    }

    return children;

}





export default ProtectedRoutes;