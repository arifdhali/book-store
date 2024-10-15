import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    let location = useLocation();
    const [locationActive, setLocationActive] = useState(location.pathname);

    useEffect(() => {
        setLocationActive(location.pathname);
    }, [location]);

    return (
        <div className="navigation d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary position-fixed top-0 start-0 h-100">
            <span className='fs-5 text-dark'>
                {import.meta.env.VITE_APP_NAME}
            </span>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link
                        to={'/admin'}
                        className={`nav-link ${locationActive === '/admin' ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to={'/admin/manage'}
                        className={`nav-link ${locationActive === '/admin/manage' ? 'active' : ''}`}
                    >
                        Manage
                    </Link>
                </li>
            </ul>
            <hr />
            <button className='btn btn-danger'>Logout</button>
        </div>
    );
};

export default Sidebar;
