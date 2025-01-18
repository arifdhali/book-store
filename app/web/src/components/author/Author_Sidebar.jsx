import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBook, faChartLine, faComments, faDollarSign, faHandHoldingDollar, faHome, faList, faRightFromBracket, faTag, faTicket, faUserGraduate, faUsers, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import useUrlRemover from '../../hooks/useUrlRemover';
import AppRoute from "../../routes/routes";
import Logo from "../../assets/image/store_logo.png"

const Sidebar = () => {
    let location = useLocation();
    const [locationActive, setLocationActive] = useState(location.pathname);
    const [collapseExpanded, setCollapseExpanded] = useState(true);

    useEffect(() => {
        setLocationActive(location.pathname);
        if (location.pathname.includes(AppRoute.AUTHOR.BOOK.BASE)) {
            setCollapseExpanded(true);
        } else {
            setCollapseExpanded(false);
        }
    }, [location]);

    return (
        <aside className='position-fixed z-3 start-0 h-100 bg-dark '>
            <div className="navigation d-flex flex-column flex-shrink-0 px-2">
                <Link to={AppRoute.AUTHOR.BASE} className='mx-auto py-3 border-1' style={{ width: "60px" }}>
                    <img src={Logo} alt="" className='img-fluid object-fit-contain rounded-5' />
                </Link>
                <ul className="nav nav-pills flex-column mb-auto" id='menu-bar'>

                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.AUTHOR.BASE}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.AUTHOR.BASE ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faHome} />
                                Dashboard
                            </div>
                        </Link>
                    </li>

                    <li className="nav-item mb-1">
                        <Link
                            to="#booksCollapse"
                            className={`nav-link d-flex justify-content-between align-items-center`}
                            data-bs-toggle="collapse"
                            aria-expanded={`${collapseExpanded ? "true" : "false"}`}
                            aria-controls="booksCollapse"
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faBook} />
                                Books
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                        <div id="booksCollapse" className={`collapse ${collapseExpanded ? "show" : ""}`} data-bs-parent="#menu-bar">
                            <ul className="nav flex-column ms-3 submenu">
                                <li className="nav-item">
                                    <Link
                                        to={AppRoute.AUTHOR.BOOK.LIST}
                                        className={`nav-link ${useUrlRemover(locationActive) === AppRoute.AUTHOR.BOOK.LIST ? 'active' : ''}`}
                                    >
                                        List
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={AppRoute.AUTHOR.BOOK.ADD}
                                        className={`nav-link ${useUrlRemover(locationActive) === AppRoute.AUTHOR.BOOK.ADD ? 'active' : ''}`}
                                    >
                                        Add Book
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </li>
                    {/* Orders */}
                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.AUTHOR.COUPON.BASE}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.AUTHOR.COUPON.BASE ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faTicket} />
                                Coupons
                            </div>
                        </Link>
                    </li>
                    {/* Orders */}
                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.AUTHOR.ORDER}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.AUTHOR.ORDER ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faWarehouse} />
                                Orders
                            </div>
                        </Link>
                    </li>
                    {/*  My Subscription */}
                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.AUTHOR.MY_SUBSCRIPTION}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.AUTHOR.MY_SUBSCRIPTION ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faTag} />
                                My Subscription
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link
                            to={AppRoute.AUTHOR.READER_FEEDBACK}
                            className={`nav-link ${useUrlRemover(locationActive) === AppRoute.AUTHOR.READER_FEEDBACK ? 'active' : ''}`}
                        >
                            <div className='d-flex gap-3 align-items-center'>
                                <FontAwesomeIcon icon={faComments} />
                                Reader Feedback
                            </div>
                        </Link>
                    </li>
                </ul>
                <hr />
                <button data-bs-target="#LogoutAuthor" data-bs-toggle="modal" className="btn btn-danger d-flex gap-3 justify-content-between">
                    Logout
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
