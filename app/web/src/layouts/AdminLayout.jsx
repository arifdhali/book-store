import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../components'
import "../style/admin.min.css"

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="admin-container px-4">
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default AdminLayout
