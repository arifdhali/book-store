import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import AppRoute from '../../../routes/routes';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify"

const Edit = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [previewProfileImage, setPreviewProfileImage] = useState(null);
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        bio: '',
        profile_img: null,
        status: '',
    });

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Author name is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            bio: Yup.string().required('Description is required'),
            profile_img: Yup.mixed().nullable(),
            status: Yup.string().required('Status is required'),
        }),
        onSubmit: (values) => {
            // Compare values with initial values
            const changedData = {};
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'profile_img') {
                    if (value) {
                        changedData[key] = value;
                    }
                } else if (value !== initialValues[key]) {
                    changedData[key] = value;
                }
            });
            if (Object.keys(changedData).length >= 1) {
                const formData = new FormData();
                Object.entries(changedData).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                updateAuthor(formData);
            } else {
                console.log("No input changes!.")
            }
        },
        enableReinitialize: true,
    });

    const handleFileChange = (event) => {
        const image = event.target.files[0];
        formik.setFieldValue('profile_img', image);
        setPreviewProfileImage(URL.createObjectURL(image));
    };

    const updateAuthor = async (formData) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_SERVER_API_URL}${AppRoute.ADMIN.AUTHORS.VIEW(params.id)}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            ).then((response) => {

                if (response?.data?.result?.status) {
                    toast.success(response?.data?.result?.message)
                    navigate(AppRoute.ADMIN.AUTHORS.LIST);
                }
            })

        } catch (error) {
            console.error('Error updating author:', error);
            alert('Failed to update author. Please try again.');
        }
    };

    const getSpecificData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_API_URL}${AppRoute.ADMIN.AUTHORS.VIEW(params.id)}`
            );
            const authordata = response.data?.result[0];
            const values = {
                name: authordata?.name || '',
                email: authordata?.email || '',
                bio: authordata?.bio || '',
                profile_img: null,
                status: authordata?.status || '',
            };
            setInitialValues(values);
            if (authordata?.profile_img) {
                setPreviewProfileImage(
                    `${import.meta.env.VITE_SERVER_MAIN_URL}/author/${authordata.profile_img}`
                );
            }
        } catch (error) {
            console.error('Error fetching author data:', error);
        }
    };

    useEffect(() => {
        getSpecificData();
    }, []);

    return (
        <div className="p-4 bg-white rounded-2 w-50">
            <form id="author-form" autoComplete="off" onSubmit={formik.handleSubmit}>
                {/* Author Name */}
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Author Name</label>
                    <input
                        type="text"
                        className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        placeholder="Enter Author Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <div className="invalid-feedback">{formik.errors.name}</div>
                    ) : null}
                </div>
                {/* Email */}
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        placeholder="Enter Author Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    ) : null}
                </div>
                {/* Biography */}
                <div className="form-group mb-3">
                    <label htmlFor="bio" className="form-label">Biography</label>
                    <textarea
                        className={`form-control ${formik.errors.bio && formik.touched.bio ? 'is-invalid' : ''}`}
                        id="bio"
                        name="bio"
                        rows={4}
                        placeholder="Write a short biography"
                        onChange={formik.handleChange}
                        value={formik.values.bio}
                    />
                    {formik.errors.bio && formik.touched.bio ? (
                        <div className="invalid-feedback">{formik.errors.bio}</div>
                    ) : null}
                </div>
                {/* Profile Image */}
                <div className="form-group mb-3">
                    <label htmlFor="formFile" className="form-label">Profile Image</label>
                    {previewProfileImage && (
                        <div className="preview-profile mx-auto mb-3" style={{ width: '200px', height: '150px' }}>
                            <img className="img-fluid h-100" src={previewProfileImage} alt="Preview" />
                        </div>
                    )}
                    <input
                        className={`form-control ${formik.errors.profile_img && formik.touched.profile_img ? 'is-invalid' : ''}`}
                        name="profile_img"
                        type="file"
                        id="formFile"
                        onChange={handleFileChange}
                        onBlur={() => formik.setFieldTouched('profile_img')}
                    />
                    {formik.errors.profile_img && formik.touched.profile_img ? (
                        <div className="invalid-feedback">{formik.errors.profile_img}</div>
                    ) : null}
                </div>
                {/* Status */}
                <div className="form-group mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        id="status"
                        name="status"
                        className={`form-control ${formik.errors.status && formik.touched.status ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        value={formik.values.status}
                    >
                        <option value="" disabled>Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blocked">Blocked</option>
                    </select>
                    {formik.errors.status && formik.touched.status ? (
                        <div className="invalid-feedback">{formik.errors.status}</div>
                    ) : null}
                </div>
                {/* Submit Button */}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                        <i className="fa-solid fa-check" /> Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
