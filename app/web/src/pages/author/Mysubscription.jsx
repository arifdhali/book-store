import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCalendar, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const MySubscription = () => {
    return (
        <div className="p-4 bg-white rounded-2">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
                <h4 className="section-title m-0">My Subscription</h4>
            </div>

            {/* Current Subscription Plan */}
            <div className="mb-4">
                <h5>Current Plan</h5>
                <div className="card border-primary">
                    <div className="card-body">
                        <h6 className="card-title text-primary">
                            <FontAwesomeIcon icon={faCrown} /> Premium Plan
                        </h6>
                        <p><strong>Status:</strong> Active</p>
                        <p><strong>Expiry Date:</strong> 2025-03-15</p>
                        <p><strong>Books Allowed:</strong> Unlimited</p>
                        <p><strong>Reduced Margin:</strong> 20%</p>
                        <button className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#renewModal">
                            <FontAwesomeIcon icon={faSyncAlt} className='me-2' /> Renew Subscription
                        </button>
                    </div>
                </div>
            </div>

            {/* Subscription Plans */}
            <h5>Available Plans</h5>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Basic Plan</h6>
                            <p><strong>Books Allowed:</strong> 10 per month</p>
                            <p><strong>Margin:</strong> 30%</p>
                            <p><strong>Price:</strong> $10/month</p>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#subscribeModal">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Premium Plan</h6>
                            <p><strong>Books Allowed:</strong> Unlimited</p>
                            <p><strong>Reduced Margin:</strong> 20%</p>
                            <p><strong>Price:</strong> $30/month</p>
                            <p><strong>Analytics:</strong> Full</p>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#subscribeModal">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Renew Subscription Modal */}
            <div
                className="modal fade"
                id="renewModal"
                tabIndex={-1}
                aria-labelledby="renewModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="renewModalLabel">Renew Subscription</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Renew your Premium Plan for another month at $30.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Renew</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscribe to Plan Modal */}
            <div
                className="modal fade"
                id="subscribeModal"
                tabIndex={-1}
                aria-labelledby="subscribeModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="subscribeModalLabel">Subscribe to Plan</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Select a plan to publish more books with exclusive benefits.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySubscription;
