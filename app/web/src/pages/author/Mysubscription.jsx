import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCalendar, faSyncAlt, faCheck, faClose, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import AppRotues from "@/routes/routes"
import axios from 'axios';

const MySubscription = () => {
    const { user_id, subscription_type } = useSelector((state) => state.authors.user);
    console.log(subscription_type)
    const [subscription, setSubscription] = useState();
    const GetSubscription = async () => {
        let response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRotues.AUTHOR.MY_SUBSCRIPTION}`, {
            params: {
                user_id
            }
        })
        setSubscription(response.data.subscription_details[0])
    }
    useEffect(() => {
        GetSubscription();
    }, [user_id])
    console.log(subscription)
    return (
        <section className="subscription p-4 bg-light rounded-2">
            <div className="row mb-5">
                {/* Basic Plan */}
                <div className="col-12">
                    <div className="shadow rounded-2 border border-2 border-info active-plan basic-plan">
                        <div className="p-3  bg-info text-white d-flex justify-content-between">
                            <div>
                                <h2 className='mb-1'>{subscription && subscription?.subscription_type.charAt(0).toUpperCase() + subscription?.subscription_type.slice(1, subscription?.subscription_type.length)}</h2>
                                <p className="mb-0"><strong>${subscription && subscription?.subscription_price}</strong>/month</p>
                            </div>
                            <div>
                                <p>
                                    Expire in: {subscription && new Date(subscription?.end_date).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="p-4">
                            <h5 className="text-info">Features</h5>
                            <ul className="list-unstyled">
                                <li><FontAwesomeIcon icon={faCheck} /> Sell Up to <strong>{subscription && subscription?.book_limit == null || subscription?.book_limit == "" ? "Unlimited" : subscription?.book_limit}</strong> Books</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Basic <strong> Analytics</strong></li>
                                <li><FontAwesomeIcon icon={faCheck} /> Add  <strong>{subscription && subscription?.coupons_limit == null || subscription?.coupons_limit == "" ? "Unlimited" : subscription?.coupons_limit}</strong> Coupons </li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book:  <strong>{subscription && subscription?.book_quantity == null || subscription?.book_quantity == '' ? "Unlimited" : subscription?.book_quantity}</strong> Quantity</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: <strong> {subscription && subscription?.order_margin == null || subscription?.order_margin == '' ? 0 : subscription?.order_margin}%</strong> margin</li>
                                <li><FontAwesomeIcon icon={subscription_type == 'premium' ? faCheck : faClose} /> Advanced Analytics</li>
                            </ul>
                        </div>
                        <div className="p-3 text-center  d-flex justify-content-between gap-2">
                            <div className="rounded-1 d-flex align-items-center  bg-secondary text-white w-100 p-2" >
                                Current Plan
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {/* Standard Plan */}
                <div className="col-md-6">
                    <div className="shadow rounded-2 border  standard-plan">
                        <div className="p-3 text-center bg-secondary text-white rounded-2 rounded-bottom-0">
                            <h3>Free Plan</h3>
                            <p className="mb-0"><strong>$15</strong>/month</p>
                        </div>
                        <div className="p-4">
                            <h5 className="text-secondary">Features</h5>
                            <ul className="list-unstyled">
                                <li><FontAwesomeIcon icon={faCheck} /> Up to <strong>10</strong> Books</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Basic <strong> Analytics</strong></li>
                                <li><FontAwesomeIcon icon={faCheck} /> Add  <strong>10</strong> Coupons </li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: <strong>10</strong> Quantity</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: <strong>30%</strong> margin</li>
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
                <div className="col-md-6">
                    <div className="shadow rounded-2 border  premium-plan">
                        <div className="p-3 text-center bg-primary text-white rounded-2 rounded-bottom-0">
                            <h3>Premium Plan</h3>
                            <p className="mb-0"><strong>$699</strong>/month</p>
                        </div>
                        <div className="p-4">
                            <h5 className="text-primary">Features</h5>
                            <ul className="list-unstyled">
                                <li><FontAwesomeIcon icon={faCheck} /> <strong>Unlimited</strong> Books</li>
                                <li><FontAwesomeIcon icon={faCheck} /> <strong>Advanced</strong> Analytics</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Add  <strong>Unlimited</strong> Coupons </li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: <strong>Unlimited</strong> Quantity</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Per Book: <strong> 0% margin</strong></li>
                                <li><FontAwesomeIcon icon={faCheck} /> <strong>Comprehensive</strong> Analytics Reporting</li>
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
