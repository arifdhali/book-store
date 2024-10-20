import React from 'react'
import { Link } from 'react-router-dom'
import AppRoutes from "../../../routes/routes"
const Login = () => {
  return (
    <div className='col-md-4 '>
      <div className='card bg-white p-4 rounded-2 shadow-lg border-0'>
        <div className='card-body'>
          <div className='text-center mb-4'>
            <h2>Hi, Admin</h2>
            <p>Enter your credentials to continue</p>
          </div>
          <form className="form">
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Enter email' />
            </div>
            <div>
              <input type="password" className='form-control' placeholder='Enter password' />
            </div>
            <div className='mb-4'>
              <small>
                <Link to={AppRoutes.AUTH.ADMIN.FORGOTPASS}>Forgot password ?</Link>
              </small>
            </div>
            <div><button type="submit" className='btn btn-primary w-100'>Login</button></div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login