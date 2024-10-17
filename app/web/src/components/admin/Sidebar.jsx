import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useUrlRemover from '../../hooks/useUrlRemover';

const Sidebar = () => {
    let location = useLocation();
    const [locationActive, setLocationActive] = useState(location.pathname);

    useEffect(() => {
        setLocationActive(location.pathname);
    }, [location]);


    return (
        <div className="navigation d-flex flex-column flex-shrink-0 p-3  position-fixed start-0 h-100 ">

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-1">
                    <Link
                        to={'users'}
                        className={`nav-link ${useUrlRemover(locationActive) === '/admin/users' ? 'active' : ''}`}
                    >
                        Users
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link
                        to={'subscriptions'}
                        className={`nav-link ${useUrlRemover(locationActive) === '/admin/subscriptions' ? 'active' : ''}`}
                    >
                        Subscriptions
                    </Link>
                </li>
            </ul>
            <hr />
            <button className='btn btn-danger'>Logout</button>
        </div>
    );
};

export default Sidebar;
