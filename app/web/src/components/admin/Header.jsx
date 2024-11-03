import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Logo from "../../assets/image/store_logo.png";

const Header = () => {
    return (
        <div className='header bg-white p-2 rounded-2 border-1 d-flex align-items-center justify-content-between gap-3 position-sticky top-0 start-0 z-3'>
            <div className="w-25 d-none d-xl-block">
                <div className="form-group input-group mb-0 search-input w-100">
                    <span className="input-group-text ps-3 pe-0 border-0">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </span>
                    <input type="text" className="form-control border-0" placeholder="Search..." />
                </div>
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
                        <li><a className="dropdown-item" href="#">Menu item</a></li>
                        <li className="dropdown-item" role='button'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-logout"><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path><path d="M9 12h12l-3 -3"></path><path d="M18 15l3 -3"></path></svg>
                            <span className='ms-2'>Logout</span>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default Header;
