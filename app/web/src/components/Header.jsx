import React from 'react'
import store_logo from "@/assets/image/store_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import AppRoutes from "@/routes/routes"

const Header = () => {
    return (
        <header className='mainpage-header'>
            <div className="header-content container">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <Link to={AppRoutes.HOME} className='logo'>
                        <img src={store_logo} alt="Logo" />
                    </Link>
                    <nav className='d-flex justify-content-center'>
                        <ul className='nav'>
                            <li className='nav-item'>
                                <NavLink
                                    to={AppRoutes.HOME}
                                    className={({ isActive }) => isActive ? 'active' : ''}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={AppRoutes.ABOUT} className={({ isActive }) => isActive ? 'active' : ''}>
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <a href="#">Shop</a>
                            </li>
                            <li>
                                <a href="#">How to build</a>
                            </li>
                        </ul>
                    </nav>
                    <div role='button'>
                        {/* <FontAwesomeIcon icon={faBars} />
                         */}
                        <Link to={AppRoutes.AUTH.AUTHOR.LOGIN}>Login</Link>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header