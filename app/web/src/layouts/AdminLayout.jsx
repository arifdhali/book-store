import React from 'react'
import { Outlet } from 'react-router-dom'
import { Admin_Header, Admin_Sidebar } from '../components'
import "../style/admin.css"

const AdminLayout = () => {

  return (
    <>
      <Admin_Sidebar />
      <main className="dashboard-content position-relative rounded-3 h-100 ">
        <Admin_Header />
        <div className="inner-content m-4">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AdminLayout
