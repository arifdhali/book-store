import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../components'
import "../style/admin.css"

const AdminLayout = () => {
  return (
    <>
      <Header />
      <div className="admin-container px-4">
        <div className="sidebar">
          <Sidebar />
        </div>
        <section className="dashboard-content position-relative p-4 rounded-3">
          <div className='p-3 rounded-2 bg-white mb-4'>
            <p className='m-0'>Bread crumb</p>
          </div>

          <div className='section-content p-3 rounded-2 bg-white'>
            <Outlet />
          </div>
        </section>
      </div>
    </>
  )
}

export default AdminLayout
