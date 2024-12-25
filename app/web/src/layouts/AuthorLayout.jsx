import React, { useEffect, useState } from 'react'
import { Author_Footer, Author_Header, Author_Sidebar } from '../components'
import { Outlet } from 'react-router-dom'
import AppRoute from "../routes/routes";
import Cookies from "js-cookie";
import axios from 'axios';

const AuthorLayout = () => {
  const token = Cookies.get('AUTHOR_TOKEN');
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
