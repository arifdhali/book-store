import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../components'
import "../style/admin.css"

const AdminLayout = () => {

  return (
    <>
      <Sidebar />
      <main className="dashboard-content position-relative rounded-3 h-100 ">
        <Header />
        <div className="inner-content m-4">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AdminLayout
