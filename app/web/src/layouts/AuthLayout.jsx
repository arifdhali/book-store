import React from 'react'
import { Outlet } from 'react-router-dom';
import "../style/Author.css";
const AuthLayout = () => {
  return (
    <section className='auth-page w-100 h-100'>
      <div className="row justify-content-center align-items-center h-100">
        <Outlet />
      </div>
    </section>
  )
}

export default AuthLayout
