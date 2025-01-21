import React from 'react'
import store_logo from "@/assets/image/store_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header>
            <div className="header-content">
                <div className="row">
                    <div className="col-2">
                        <a href="#">
                            <img src={store_logo} alt="Logo" />
                        </a>
                    </div>
                    <div className="col-8">
                        <nav >
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
                    </div>
                    <div className="col-2">
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header