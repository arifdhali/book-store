import React, { useEffect, useState } from 'react'
import { Author_Footer, Author_Header, Author_Sidebar } from '../components'
import { Outlet } from 'react-router-dom'
import AppRoute from "../routes/routes";
import Cookies from "js-cookie";
import axios from 'axios';
import { AboutAtuhorSlice } from '../store/slices/author/AuthorSlice';
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";

const AuthorLayout = () => {
  const dispatch = useDispatch();

  const token = Cookies.get('AUTHOR_TOKEN');
  const decode = jwtDecode(token);
  const [dashboardData, setDashboardData] = useState({});

  const getDashboardInfo = () => {
    axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.AUTHOR.BASE}`, {
      headers: {
        Authorization: token,
      }
    })
      .then((value) => setDashboardData(value.data));
  }
  useEffect(() => {
    getDashboardInfo();
    dispatch(AboutAtuhorSlice(decode.user));

  }, [token])

  return (
    <>
      <Author_Sidebar />
      <main className="dashboard-content position-relative rounded-3 h-100 ">
        <Author_Header user={dashboardData?.user_info} />
        <div className="inner-content m-4">
          <Outlet />
        </div>
        <Author_Footer />
      </main>
    </>
  )
}

export default AuthorLayout
