import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import * as Yup from "yup";
import { useFormik } from 'formik';

const Coupon = () => {
    const formik = useFormik({
        initialValues: {
            code: "",
            discount: "",
            expirationDate: new Date().toISOString().slice(0, 10),
            where_to_apply: "",
            status: ""
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Code is required"),
            discount: Yup.number().required("Discount is required"),
            expirationDate: Yup.date()
                .min(new Date(), "Expiration Date cannot be in the past")
                .required("Expiration Date is required"),
            where_to_apply: Yup.string().required("Where to apply is required"),
            status: Yup.string().required("Status is required")
        }),
        onSubmit: (values) => {
            console.log("Form Submitted", values);
            

        }
    });

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
                            <th>Where to Apply</th>
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
                            <td>Min order 1000</td>
                            <td>Active</td>
                            <td valign='middle'>
                                <div className='item-actions d-flex gap-2'>
                                    <span role='button' className='act edit' data-bs-toggle="modal" data-bs-target="#EditCouponModal">
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </span>
                                    <span role='button' className='act delete' data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Add Coupon Modal */}
                <div className="modal fade" id="addCouponModal" tabIndex={-1} aria-labelledby="addCouponModalLabel" >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addCouponModalLabel">Add New Coupon</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="code" className="form-label">Coupon Code</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.code && formik.errors.code ? 'is-invalid' : ''}`}
                                            id="code"
                                            name="code"
                                            onChange={formik.handleChange}
                                            value={formik.values.code}
                                        />
                                        {formik.touched.code && formik.errors.code ? (
                                            <div className="invalid-feedback">{formik.errors.code}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="code" className="form-label">Where to apply</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.where_to_apply && formik.errors.where_to_apply ? 'is-invalid' : ''}`}
                                            id="code"
                                            name="where_to_apply"
                                            onChange={formik.handleChange}
                                            value={formik.values.where_to_apply}
                                        />
                                        {formik.touched.where_to_apply && formik.errors.where_to_apply ? (
                                            <div className="invalid-feedback">{formik.errors.where_to_apply}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="discount" className="form-label">Discount (%)</label>
                                        <input
                                            type="number"
                                            className={`form-control ${formik.touched.discount && formik.errors.discount ? 'is-invalid' : ''}`}
                                            id="discount"
                                            name="discount"
                                            onChange={formik.handleChange}
                                            value={formik.values.discount}
                                        />
                                        {formik.touched.discount && formik.errors.discount ? (
                                            <div className="invalid-feedback">{formik.errors.discount}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                                        <input
                                            type="date"
                                            className={`form-control ${formik.touched.expirationDate && formik.errors.expirationDate ? 'is-invalid' : ''}`}
                                            id="expirationDate"
                                            name="expirationDate"
                                            onChange={formik.handleChange}
                                            value={formik.values.expirationDate}
                                        />
                                        {formik.touched.expirationDate && formik.errors.expirationDate ? (
                                            <div className="invalid-feedback">{formik.errors.expirationDate}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select
                                            className={`form-select ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
                                            id="status"
                                            name="status"
                                            onChange={formik.handleChange}
                                            value={formik.values.status}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Expired">Expired</option>
                                        </select>
                                        {formik.touched.status && formik.errors.status ? (
                                            <div className="invalid-feedback">{formik.errors.status}</div>
                                        ) : null}
                                    </div>

                                    <div className="modal-footer border-top-0">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-primary">Add Coupon</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                   {/* Add Coupon Modal */}
                   <div className="modal fade" id="EditCouponModal" tabIndex={-1} aria-labelledby="EditCouponModalLabel" >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EditCouponModalLabel">Add New Coupon</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="code" className="form-label">Coupon Code</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.code && formik.errors.code ? 'is-invalid' : ''}`}
                                            id="code"
                                            name="code"
                                            onChange={formik.handleChange}
                                            value={formik.values.code}
                                        />
                                        {formik.touched.code && formik.errors.code ? (
                                            <div className="invalid-feedback">{formik.errors.code}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="code" className="form-label">Where to apply</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.where_to_apply && formik.errors.where_to_apply ? 'is-invalid' : ''}`}
                                            id="code"
                                            name="where_to_apply"
                                            onChange={formik.handleChange}
                                            value={formik.values.where_to_apply}
                                        />
                                        {formik.touched.where_to_apply && formik.errors.where_to_apply ? (
                                            <div className="invalid-feedback">{formik.errors.where_to_apply}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="discount" className="form-label">Discount (%)</label>
                                        <input
                                            type="number"
                                            className={`form-control ${formik.touched.discount && formik.errors.discount ? 'is-invalid' : ''}`}
                                            id="discount"
                                            name="discount"
                                            onChange={formik.handleChange}
                                            value={formik.values.discount}
                                        />
                                        {formik.touched.discount && formik.errors.discount ? (
                                            <div className="invalid-feedback">{formik.errors.discount}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                                        <input
                                            type="date"
                                            className={`form-control ${formik.touched.expirationDate && formik.errors.expirationDate ? 'is-invalid' : ''}`}
                                            id="expirationDate"
                                            name="expirationDate"
                                            onChange={formik.handleChange}
                                            value={formik.values.expirationDate}
                                        />
                                        {formik.touched.expirationDate && formik.errors.expirationDate ? (
                                            <div className="invalid-feedback">{formik.errors.expirationDate}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select
                                            className={`form-select ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
                                            id="status"
                                            name="status"
                                            onChange={formik.handleChange}
                                            value={formik.values.status}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Expired">Expired</option>
                                        </select>
                                        {formik.touched.status && formik.errors.status ? (
                                            <div className="invalid-feedback">{formik.errors.status}</div>
                                        ) : null}
                                    </div>

                                    <div className="modal-footer border-top-0">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-primary">Add Coupon</button>
                                    </div>
                                </form>
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
