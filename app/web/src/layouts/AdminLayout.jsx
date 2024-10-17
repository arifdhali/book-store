import React from 'react'
import { Outlet, Routes } from 'react-router-dom'
import { Header, Sidebar } from '../components'
import "../style/admin.min.css"

const AdminLayout = () => {
  return (
    <>
  
      <Header />
      <div className="admin-container px-4">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="dashboard-content position-relative p-4 rounded-4">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminLayout
