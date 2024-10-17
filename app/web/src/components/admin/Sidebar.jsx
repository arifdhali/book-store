import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';


import { Link, useLocation } from 'react-router-dom';
import useUrlRemover from '../../hooks/useUrlRemover';

const Sidebar = () => {
    let location = useLocation();
    const [locationActive, setLocationActive] = useState(location.pathname);

    useEffect(() => {
        setLocationActive(location.pathname);
    }, [location]);


    return (
        <div className="navigation d-flex flex-column flex-shrink-0 p-3 position-fixed start-0 h-100">
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-1">
                    <Link
                        to="#authorsCollapse"
                        className={`nav-link d-flex justify-content-between align-items-center`}
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="authorsCollapse"
                    >
                        Authors
                        <FontAwesomeIcon icon={faAngleDown} />
                    </Link>
                    <div id="authorsCollapse" className="collapse">
                        <ul className="nav flex-column ms-3">
                            <li className="nav-item">
                                <Link
                                    to={AppRoute.ADMIN.AUTHORS.LIST}
                                    className={`nav-link ${useUrlRemover(locationActive) === AppRoute.ADMIN.AUTHORS.LIST ? 'active' : ''}`}
                                >
                                    List
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to={AppRoute.ADMIN.AUTHORS.ADD} 
                                    className={`nav-link ${useUrlRemover(locationActive) === AppRoute.ADMIN.AUTHORS.ADD ? 'active' : ''}`}
                                >
                                    Author
                                </Link>
                            </li>
                        </ul>

                    </div>
                </li>

                {/* Other Items */}
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
            <button className="btn btn-danger">Logout</button>
        </div>

    );
};

export default Sidebar;
