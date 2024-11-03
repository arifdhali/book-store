import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AdminHome = () => {
  return (
    <>
      <div className="row ">
        <div className="col-md-3">
          <div className="card border-0 rounded-1">
            <div className="card-body p-4">
              <div className='d-flex  gap-4'>
                <div className='item-icon rounded-5 d-flex align-items-center justify-content-center text-white'>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className='item-data'>
                  <p>5000</p>
                  <span>Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 rounded-1">
            <div className="card-body p-4">
              <div className='d-flex  gap-4'>
                <div className='item-icon rounded-5 d-flex align-items-center justify-content-center text-white'>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className='item-data'>
                  <p>5000</p>
                  <span>Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 rounded-1">
            <div className="card-body p-4">
              <div className='d-flex  gap-4'>
                <div className='item-icon rounded-5 d-flex align-items-center justify-content-center text-white'>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className='item-data'>
                  <p>5000</p>
                  <span>Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 rounded-1">
            <div className="card-body p-4">
              <div className='d-flex  gap-4'>
                <div className='item-icon rounded-5 d-flex align-items-center justify-content-center text-white'>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className='item-data'>
                  <p>5000</p>
                  <span>Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome
