import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import * as Yup from "yup";
import AppRoutes from "../../routes/routes";
import { useFormik } from 'formik';
import axios from 'axios';
import { formattedDateTime } from "../../utils/FormattedDateTime";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Coupon = () => {
    const { user_id } = useSelector((state) => state.authors.user);
    const [book, setBook] = useState([]);
    const [Coupons, setCoupons] = useState([]);
    const [CouponID, setCouponID] = useState();
    const formik = useFormik({
        initialValues: {
            book_id: "",
            code: "",
            discount: "",
            start_date: "",
            expire_date: "",
            where_to_apply: "",
            status: ""
        },
        validationSchema: Yup.object({
            book_id: Yup.string().required("Select the book name"),
            code: Yup.string().required("Code is required"),
            discount: Yup.number().required("Discount is required"),
            start_date: Yup.date()
                .min(new Date(), "Expiration Date cannot be in the past")
                .required("Expiration Date is required"),
            expire_date: Yup.date()
                .min(new Date(), "Expiration Date cannot be in the past")
                .required("Expiration Date is required"),
            where_to_apply: Yup.string().required("Where to apply is required"),
            status: Yup.string().required("Status is required")
        }),
        onSubmit: async (values, { resetForm }) => {
            const formatedValues = {
                ...values,
                start_date: formattedDateTime(values.start_date),
                expire_date: formattedDateTime(values.expire_date)
            };
            let response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.COUPON.ADD}`, formatedValues, {
                params: {
                    user_id
                }
            });
            if (response.data.status) {
                toast.success(response.data.message)
                resetForm();
                getCoupons();
            }
        }
    });

    const GetBooks = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.BOOK.LIST}`, {
                params: { user_id }
            }).then((value) => setBook(value.data.books));
        } catch (err) {
            console.log(err);
        }
    };

    const getCoupons = async () => {
        let response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.COUPON.BASE}`, {
            params: {
                user_id
            }
        });
        if (response.data.status) {
            setCoupons(response.data.coupons)
        }
    };
    const DeleteCoupons = async () => {
        let response = await axios.delete(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.COUPON.SINGLE(CouponID)}`)
        if (response.data.status) {
            toast.success(response.data.message)
            getCoupons();
        }
    }

    useEffect(() => {
        getCoupons();
        GetBooks();
    }, [user_id]);
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
                            <th className='text-center'>Discount</th>
                            <th className='text-center'>Expiration Date</th>
                            <th>Where to Apply</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Coupons.length > 0 ? (
                                Coupons.map((coupon, index) => (
                                    <tr key={coupon.id}>
                                        <td>{index + 1}</td>
                                        <td>{coupon?.code}</td>
                                        <td align='center'>{coupon?.discount}%</td>
                                        <td align='center'>{formattedDateTime(coupon?.expire_date)}</td>
                                        <td>{coupon?.where_to_apply}</td>
                                        <td className='text-capitalize'>{coupon?.status}</td>
                                        <td valign='middle'>
                                            <div className='item-actions d-flex gap-2'>
                                                <span role='button' className='act edit' data-bs-toggle="modal" data-bs-target="#EditCouponModal">
                                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                                </span>
                                                <span onClick={() => setCouponID(coupon.id)} role='button' className='act delete' data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan={7} align='center'>No coupons found</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>

                {/* Add Coupon Modal */}
                <div className="modal fade" id="addCouponModal" tabIndex={-1} aria-labelledby="addCouponModalLabel">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addCouponModalLabel">Add New Coupon</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="code" className="form-label">Book Name</label>
                                        <div>
                                            <select className={`form-select ${formik.touched.book_id && formik.errors.book_id ? 'is-invalid' : ''}`} name="book_id" id=""
                                                onChange={formik.handleChange}
                                                value={formik.values.book_id}
                                            >
                                                {
                                                    book.length > 0 ? (
                                                        <>
                                                            <option defaultChecked>Choose Book</option>
                                                            {book.map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <option disabled>No books available</option>
                                                    )
                                                }
                                            </select>
                                            {formik.touched.book_id && formik.errors.book_id && <div className="invalid-feedback">{formik.errors.book_id}</div>}

                                        </div>
                                        {formik.touched.code && formik.errors.code && <div className="invalid-feedback">{formik.errors.code}</div>}
                                    </div>
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
                                        {formik.touched.code && formik.errors.code && <div className="invalid-feedback">{formik.errors.code}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="where_to_apply" className="form-label">Where to apply</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.where_to_apply && formik.errors.where_to_apply ? 'is-invalid' : ''}`}
                                            id="where_to_apply"
                                            name="where_to_apply"
                                            onChange={formik.handleChange}
                                            value={formik.values.where_to_apply}
                                        />
                                        {formik.touched.where_to_apply && formik.errors.where_to_apply && <div className="invalid-feedback">{formik.errors.where_to_apply}</div>}
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
                                        {formik.touched.discount && formik.errors.discount && <div className="invalid-feedback">{formik.errors.discount}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="start_date" className="form-label">Start Date</label>
                                        <input
                                            type="date"
                                            className={`form-control ${formik.touched.start_date && formik.errors.start_date ? 'is-invalid' : ''}`}
                                            id="start_date"
                                            name="start_date"
                                            onChange={formik.handleChange}
                                            value={formik.values.start_date}
                                        />
                                        {formik.touched.start_date && formik.errors.start_date && <div className="invalid-feedback">{formik.errors.start_date}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="expire_date" className="form-label">Expiration Date</label>
                                        <input
                                            type="date"
                                            className={`form-control ${formik.touched.expire_date && formik.errors.expire_date ? 'is-invalid' : ''}`}
                                            id="expire_date"
                                            name="expire_date"
                                            onChange={formik.handleChange}
                                            value={formik.values.expire_date}
                                        />
                                        {formik.touched.expire_date && formik.errors.expire_date && <div className="invalid-feedback">{formik.errors.expire_date}</div>}
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
                                        {formik.touched.status && formik.errors.status && <div className="invalid-feedback">{formik.errors.status}</div>}
                                    </div>
                                    <div className="modal-footer border-top-0">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Coupon</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Coupon Modal */}
                <div className="modal fade" id="EditCouponModal" tabIndex={-1} aria-labelledby="EditCouponModalLabel">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EditCouponModalLabel">Edit Coupon</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={formik.handleSubmit}>
                                    {/* Same as the Add Coupon Modal form */}
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
                            <div className="modal-footer justify-content-start">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                <button type="button" className="btn btn-danger"  data-bs-dismiss="modal" aria-label="Close" onClick={DeleteCoupons}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Coupon;
