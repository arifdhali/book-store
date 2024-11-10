import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Coupon = () => {
    return (
        <>
            <div className='p-4 bg-white rounded-2'>
                <div className='d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom'>
                    <h4 className='section-title m-0'>My Coupons</h4>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCouponModal">
                        Add New Coupon
                    </button>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: "40px" }}>No</th>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Expiration Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>312a</td>
                            <td>10%</td>
                            <td>22-03-2025</td>
                            <td>Active</td>
                            <td valign='middle'>
                                <div className='item-actions'>
                                    <span role='button' className='act delete' data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Add Coupon Modal */}
                <div className="modal fade" id="addCouponModal" tabIndex={-1} aria-labelledby="addCouponModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addCouponModalLabel">Add New Coupon</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="code" className="form-label">Coupon Code</label>
                                        <input type="text" className="form-control" id="code" name="code" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="discount" className="form-label">Discount (%)</label>
                                        <input type="number" className="form-control" id="discount" name="discount" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                                        <input type="date" className="form-control" id="expirationDate" name="expirationDate" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select className="form-select" id="status" name="status">
                                            <option value="Active">Active</option>
                                            <option value="Expired">Expired</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary">Add Coupon</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Coupon Modal */}
                <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Delete Coupon</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this coupon?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Coupon;
