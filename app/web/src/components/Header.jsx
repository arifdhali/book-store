import React from 'react'
import store_logo from "@/assets/image/store_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import  AppRoutes  from "@/routes/routes"

const Header = () => {
    return (
        <header>
            <div className="header-content container">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <a href="#" className='logo'>
                        <img src={store_logo} alt="Logo" />
                    </a>
                    <nav className='d-flex justify-content-center'>
                        <ul className='nav'>
                            <li className='nav-item'>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About</a>
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