import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AppRoute from "../../routes/routes"

const OrderList = () => {
    return (
        <div className="p-4 bg-white rounded-2">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
                <h4 className="section-title m-0">Order List</h4>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "40px" }}>No</th>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Book Title</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center'>Total Price</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>ORD12345</td>
                        <td>John Doe</td>
                        <td>Some Book Title</td>
                        <td align='center'>2</td>
                        <td align='center'>$39.98</td>
                        <td>2024-11-08</td>
                        <td>Completed</td>
                        <td>
                            <div className="item-actions d-flex gap-2">
                                <Link to={AppRoute.AUTHOR.SINGLE_ORDER(19)} role="button" className="act view" title="View Details">
                                    <FontAwesomeIcon icon={faEye} /> View
                                </Link>
                                <span role="button" className="act delete" data-bs-toggle="modal" data-bs-target="#deleteOrderModal" title="Delete Order">
                                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                                </span>
                            </div>
                        </td>
                    </tr>
                    {/* More orders */}
                </tbody>
            </table>

            {/* Delete Order Modal */}
            <div
                className="modal fade"
                id="deleteOrderModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="deleteOrderModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteOrderModalLabel">Delete Order</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">Are you sure you want to delete this order?</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
