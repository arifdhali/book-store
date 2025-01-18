import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBook, faHome, faList, faMoneyBill, faMoneyBill1Wave, faMoneyBillWaveAlt, faRightFromBracket, faUserGraduate, faUsers, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import useUrlRemover from '@/hooks/useUrlRemover';
import AppRoute from "@/routes/routes";
import Logo from "@/assets/image/store_logo.png"

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
        <aside className='position-fixed z-3 start-0 h-100 bg-dark '>
            <div className="navigation d-flex flex-column flex-shrink-0 px-2">
                <Link to={AppRoute.ADMIN.BASE} className='mx-auto py-3 border-1' style={{ width: "60px" }}>
                    <img src={Logo} alt="" className='img-fluid object-fit-contain rounded-5' />
                </Link>
                <ul className="nav nav-pills flex-column mb-auto" id='menu-bar'>
                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.ADMIN.BASE}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.ADMIN.BASE ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faHome} />
                                Dashboard
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link
                            to="#authorsCollapse"
                            className={`nav-link d-flex justify-content-between align-items-center`}
                            data-bs-toggle="collapse"
                            aria-expanded={`${collapseExpanded ? "true" : "false"}`}
                            aria-controls="authorsCollapse"
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faUserGraduate} />
                                Authors
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
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
                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.ADMIN.BOOKS.ALL_BOOKS}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.ADMIN.BOOKS.ALL_BOOKS ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faBook} />
                                All Books
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.ADMIN.CATEGORY.LIST}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.ADMIN.CATEGORY.LIST ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faList} />
                                Category
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.ADMIN.USERS}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.ADMIN.USERS ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faUsers} />
                                Users
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.ADMIN.ORDERS.BASE}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.ADMIN.ORDERS.BASE ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faWarehouse} />
                                Orders
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.ADMIN.REVENU.BASE}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.ADMIN.REVENU.BASE ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faMoneyBillWaveAlt} />
                                Revenu
                            </div>
                        </Link>
                    </li>
                </ul>
                <hr />
                <button data-bs-target="#Logout" data-bs-toggle="modal" className="btn btn-danger d-flex gap-3 justify-content-between">
                    Logout
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
