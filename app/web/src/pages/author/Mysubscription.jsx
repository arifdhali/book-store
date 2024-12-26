import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCalendar, faSyncAlt, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';

const MySubscription = () => {
    return (
        <section className="subscription p-4 bg-light rounded-2">
            <div className="row">
                {/* Basic Plan */}
                <div className="col-md-4">
                    <div className="shadow rounded-2 border border-2 border-info active-plan basic-plan">
                        <div className="p-3 text-center bg-info text-white">
                            <h3>Basic Plan</h3>
                            <p className="mb-0"><strong>$0</strong>/month</p>
                        </div>
                        <div className="p-4">
                            <h5 className="text-info">Features</h5>
                            <ul className="list-unstyled">
                                <li><FontAwesomeIcon icon={faCheck} /> Up to <strong>10</strong> Books</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Basic Analytics</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: 10 Quantity</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: 30% margin</li>
                                <li><FontAwesomeIcon icon={faClose} /> Advanced Analytics</li>
                            </ul>
                        </div>
                        <div className="p-3 text-center">
                            <button className="btn btn-info w-100" disabled>
                                Current Plan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Standard Plan */}
                <div className="col-md-4">
                    <div className="shadow rounded-2 border  standard-plan">
                        <div className="p-3 text-center bg-secondary text-white">
                            <h3>Standard Plan</h3>
                            <p className="mb-0"><strong>$15</strong>/month</p>
                        </div>
                        <div className="p-4">
                            <h5 className="text-secondary">Features</h5>
                            <ul className="list-unstyled">
                                <li><FontAwesomeIcon icon={faCheck} /> Up to <strong>30</strong> Books</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Basic Analytics</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: 40 Quantity</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: 10% margin</li>
                                <li><FontAwesomeIcon icon={faClose} /> Advanced Analytics</li>
                            </ul>
                        </div>
                        <div className="p-3 text-center">
                            <a href="register?plan=standard" className="btn btn-secondary w-100">
                                Upgrade to Standard
                            </a>
                        </div>
                    </div>
                </div>

                {/* Premium Plan */}
                <div className="col-md-4">
                    <div className="shadow rounded-2 border  premium-plan">
                        <div className="p-3 text-center bg-primary text-white">
                            <h3>Premium Plan</h3>
                            <p className="mb-0"><strong>$30</strong>/month</p>
                        </div>
                        <div className="p-4">
                            <h5 className="text-primary">Features</h5>
                            <ul className="list-unstyled">
                                <li><FontAwesomeIcon icon={faCheck} /> Unlimited Books</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Advanced Analytics</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: Unlimited Quantity</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: 0% margin</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Comprehensive Analytics Reporting</li>
                            </ul>
                        </div>
                        <div className="p-3 text-center">
                            <a href="register?plan=premium" className="btn text-white bg-primary w-100">
                                Upgrade to Premium
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default MySubscription;
