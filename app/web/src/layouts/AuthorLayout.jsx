import React, { useEffect, useState } from 'react'
import { Author_Footer, Author_Header, Author_Sidebar } from '../components'
import { Outlet } from 'react-router-dom'


const AuthorLayout = () => {
  return (
    <>
      <Author_Sidebar />
      <main className="dashboard-content position-relative rounded-3 h-100 ">
        <Author_Header />
        <div className="inner-content m-4">
          <Outlet />
        </div>
        <Author_Footer />
      </main>
    </>
  )
}

export default AuthorLayout
