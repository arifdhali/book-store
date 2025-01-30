import React from 'react'
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className='auth-page w-100 d-flex align-items-center justify-content-center h-100 position-absolute' style={{background:"#575268"}}>
      <div className="container">
        <div className="row rounded-2 p-3 align-items-center" style={{background:"#2b2738"}}>
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default AuthLayout
