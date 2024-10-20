import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import useUrlRemover from '../../hooks/useUrlRemover';
import AppRoute from "../../routes/routes";


const Sidebar = () => {
    let location = useLocation();
    const [locationActive, setLocationActive] = useState(location.pathname);
    const [collapseExpanded, setCollapseExpanded] = useState(true);

    useEffect(() => {
        setLocationActive(location.pathname);
        if (location.pathname.includes(AppRoute.ADMIN.AUTHORS.BASE)) {
            setCollapseExpanded(true);
        } else {
            setCollapseExpanded(false);
        }
    }, [location]);


    return (
        <div className="navigation d-flex flex-column flex-shrink-0 p-3 position-fixed start-0 h-100 bg-white">
            <ul className="nav nav-pills flex-column mb-auto" id='menu-bar'>
                <li className="nav-item mb-1">
                    <Link
                        to="#authorsCollapse"
                        className={`nav-link d-flex justify-content-between align-items-center`}
                        data-bs-toggle="collapse"
                        aria-expanded={`${collapseExpanded ? "true" : "false"}`}
                        aria-controls="authorsCollapse"
                    >
                        Authors
                        <FontAwesomeIcon icon={faAngleDown} />
                    </Link>
                    <div id="authorsCollapse" className={`collapse ${collapseExpanded ? "show" : ""}`} data-bs-parent="#menu-bar">
                        <ul className="nav flex-column ms-3 submenu">
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
                                    to={AppRoute.ADMIN.AUTHORS.SUBSCRIPTIONS}
                                    className={`nav-link ${useUrlRemover(locationActive) === AppRoute.ADMIN.AUTHORS.SUBSCRIPTIONS ? 'active' : ''}`}
                                >
                                    Subscription
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
