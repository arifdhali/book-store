import { faBook, faCartShopping, faTowerCell, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect } from 'react'
import CountUp from "react-countup";
import AppRoutes from "@/routes/routes"
const AdminHome = () => {

  // FORMATING VALUE 
  const handelFormatingCount = (value) => {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value;
  }

  const getHome = async () => {
    let response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.ADMIN.BASE}`);
    //  console.log(response);
  }
  useEffect(() => {
    getHome();
  }, [])

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
                  <CountUp end={400} formattingFn={handelFormatingCount} />
                  <p className='title'>Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 rounded-1">
            <div className="card-body p-4">
              <div className='d-flex  gap-4'>
                <div style={{ background: "#eb5757" }} className='item-icon rounded-5 d-flex align-items-center justify-content-center text-white'>
                  <FontAwesomeIcon icon={faBook} />
                </div>
                <div className='item-data'>
                  <CountUp end={1400} formattingFn={handelFormatingCount} />
                  <p className='title'>Books</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 rounded-1">
            <div className="card-body p-4">
              <div className='d-flex  gap-4'>
                <div style={{ background: "#f16a1b" }} className='item-icon rounded-5 d-flex align-items-center justify-content-center text-white'>
                  <FontAwesomeIcon icon={faCartShopping} />
                </div>
                <div className='item-data'>
                  <CountUp end={2400} formattingFn={handelFormatingCount} />
                  <p className='title'>Sales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 rounded-1">
            <div className="card-body p-4">
              <div className='d-flex  gap-4'>
                <div style={{ background: "#08b1ba" }} className='item-icon rounded-5 d-flex align-items-center justify-content-center text-white'>
                  <FontAwesomeIcon icon={faTowerCell} />
                </div>
                <div className='item-data'>
                  <CountUp end={1100} formattingFn={handelFormatingCount} />
                  <p className='title'>Order</p>
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
