import React, { useState } from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import AppRoutes from "../../../routes/routes";
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [previewProfileImage, setPreviewProfileImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            author_name: "",
            email: "",
            bio: "",
            profile_img: null,
            premiumStatus: "",
        },
        validationSchema: Yup.object({
            author_name: Yup.string().required("Author name is required"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            bio: Yup.string().required("Description is required"),
            profile_img: Yup.mixed().required("Profile image is required"),
            premiumStatus: Yup.string().required("Premium status is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true);
            const form_data = new FormData();
            Object.entries(values).forEach(([key, data]) => {
                form_data.append(key, data);
            });

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.ADMIN.AUTHORS.ADD}`,
                    form_data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                if (response.data.result.status) {
                    toast.success(response.data.result.message);
                    resetForm();
                    setPreviewProfileImage(null);
                    navigate(AppRoutes.ADMIN.AUTHORS.LIST)
                }
            } catch (error) {
                const { message } = error?.response?.data?.result;
                toast.error(message);
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    // Handle file change
    const handleFileChange = (event) => {
        const image = event.target.files[0];
        formik.setFieldValue("profile_img", image);
        setPreviewProfileImage(URL.createObjectURL(image));
    };

    return (
        <>
            <div className='p-4 bg-white rounded-2 w-50'>
                <form id="author-form" autoComplete="off" onSubmit={formik.handleSubmit}>
                    {/* Author Name */}
                    <div className="form-group mb-3">
                        <label htmlFor="author_name" className="form-label">Author Name</label>
                        <input
                            type="text"
                            className={`form-control ${formik.errors.author_name && formik.touched.author_name ? 'is-invalid' : ''}`}
                            id="author_name"
                            name="author_name"
                            placeholder="Enter Author Name"
                            onChange={formik.handleChange}
                            value={formik.values.author_name}
                        />
                        {formik.errors.author_name && formik.touched.author_name && (
                            <div className="invalid-feedback">{formik.errors.author_name}</div>
                        )}
                    </div>

                    {/* Email */}
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            placeholder="Enter Author Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Biography */}
                    <div className="form-group mb-3">
                        <label htmlFor="bio" className="form-label">Description</label>
                        <textarea
                            className={`form-control ${formik.errors.bio && formik.touched.bio ? 'is-invalid' : ''}`}
                            id="bio"
                            name="bio"
                            rows={4}
                            placeholder="Write a short biography"
                            onChange={formik.handleChange}
                            value={formik.values.bio}
                        />
                        {formik.errors.bio && formik.touched.bio && (
                            <div className="invalid-feedback">{formik.errors.bio}</div>
                        )}
                    </div>

                    {/* Profile Image */}
                    <div className="form-group mb-3">
                        <label htmlFor="formFile" className="form-label">Profile Image</label>
                        {previewProfileImage && (
                            <div className='preview-profile mx-auto mb-3' style={{ width: "200px", height: "150px" }}>
                                <img className='img-fluid h-100' src={previewProfileImage} alt="Preview" />
                            </div>
                        )}
                        <input
                            className={`form-control ${formik.errors.profile_img && formik.touched.profile_img ? 'is-invalid' : ''}`}
                            name='profile_img'
                            type="file"
                            id="formFile"
                            onChange={handleFileChange}
                            onBlur={() => formik.setFieldTouched("profile_img")}
                        />
                        {formik.errors.profile_img && formik.touched.profile_img && (
                            <div className="invalid-feedback">{formik.errors.profile_img}</div>
                        )}
                    </div>

                    {/* Premium Author Status */}
                    <div className="form-group mb-3">
                        <label className="form-label">Premium Status</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="premiumStatus"
                                id="premiumYes"
                                value="yes"
                                onChange={formik.handleChange}
                            />
                            <label className="form-check-label" htmlFor="premiumYes">Yes (Premium Author)</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="premiumStatus"
                                id="premiumNo"
                                value="no"
                                onChange={formik.handleChange}
                            />
                            <label className="form-check-label" htmlFor="premiumNo">No (Non-Premium Author)</label>
                        </div>
                        {formik.errors.premiumStatus && formik.touched.premiumStatus && (
                            <div className="text-danger mt-2">{formik.errors.premiumStatus}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Add;
