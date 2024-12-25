import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCalendar, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const MySubscription = () => {
    return (
        <section className=" p-4 bg-white rounded-2">
            <div className="row">
                <div className="col-md-3 ">
                    <div className="rounded-2 border-1 border-light panel basic-plan">
                        <div className="p-2 px-4 panel-heading ">
                            <h3>Basic</h3>
                        </div>
                        <div className="panel-body p-4 border-1">
                            <h5>Features Include</h5>
                            <ul>
                                <li>
                                    Up to 2 users
                                </li>
                                <li>
                                    Access to 2 service workflows
                                </li>
                                <li>Basic analytics reporting
                                </li>
                                <li>Unlimited Invoice</li>
                            </ul>
                        </div>
                        <div className="panel-footer p-4">
                            <div className="pricingButton">

                                <a
                                    href="register?plan=basic_monthly"
                                    className="btn btn-primary"
                                >
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    );
};

export default MySubscription;
