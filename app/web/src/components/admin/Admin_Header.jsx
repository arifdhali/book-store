import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBell, faBackward } from '@fortawesome/free-solid-svg-icons';
import AppRoute from "../../routes/routes";
const Header = () => {
    const [backUrl, setBackUrl] = useState({
        prev_url: "",
        current_url: "",
    });
    const locations = useLocation();
    useEffect(() => {
        setBackUrl(prev => ({
            prev_url: prev.current_url,
            current_url: locations.pathname,
        }));
    }, [locations]);




    return (
        <div className='header bg-white px-4 py-2  border-bottom  d-flex align-items-center justify-content-between gap-3 position-sticky top-0 start-0 z-3'>
            <div className=" d-flex align-items-center gap-4" >
                {
                    backUrl.current_url != AppRoute.ADMIN.BASE ? (
                        <div style={{ width: "100px" }} >
                            <Link to={backUrl.prev_url} className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faBackward} /> Back
                            </Link>
                        </div>
                    ) : (
                        <>
                        </>
                    )
                }
                {/* <div className="form-group input-group mb-0 search-input w-100">
                    <span className="input-group-text ps-3 pe-0 border-0">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <input type="text" className="form-control border-0" placeholder="Search..." />
                </div> */}
            </div>
            <div className='d-flex align-items-center gap-3'>

                <span className="dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    <Link className='icon'>
                        <FontAwesomeIcon icon={faBell} />
                    </Link>
                </span>
                <ul className="dropdown-menu notifaction-popup">
                    <div className='p-3 d-flex justify-content-between align-items-center'>
                        <p className='m-0 fw-semibold'>All notifaction</p>
                        <button className='btn btn-clear'>Clear all</button>
                    </div>
                    <li className="dropdown-item">
                        <div className='d-flex '>
                            <div className='pe-2'>
                                <img src="https://berrydashboard.io/assets/user-round-QwaXuEgi.svg" alt="" />
                            </div>
                            <div className='w-100 '>
                                <div className='d-flex justify-content-between mb-1'>
                                    <strong style={{ width: "100px" }}>Author</strong>
                                    <span className='noti-time'>2 minutes</span>
                                </div>
                                <p>Purchase premium subscriptions</p>
                            </div>
                        </div>
                    </li>
                    <li className="dropdown-item">
                        <div className='d-flex'>
                            <div className='pe-2'>
                                <img src="https://berrydashboard.io/assets/user-round-QwaXuEgi.svg" alt="" />
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus minus, iure dolores fugit reiciendis odio?</p>
                            </div>
                        </div>
                    </li>
                </ul>

                <div className="btn-group ">
                    <span className="dropdown-toggle user-section" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className='rounded-circle dashboard-owner' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s" alt="" />
                        <FontAwesomeIcon icon={faGear} />
                    </span>
                    <ul className="dropdown-menu">
                        <li>
                            <Link className="dropdown-item" to={'/admin/settings'}>
                                Settings
                            </Link>
                        </li>
                      
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default Header;
