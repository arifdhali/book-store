import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Settings = () => {
    const { user_id } = useSelector((state) => state.authors.user);
    const [previewProfileImage, setPreviewProfileImage] = useState(null);
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        password: '',
        profileImage: null,
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            profileImage: Yup.mixed()
                .test('fileSize', 'File is too large (max-size 2MB)', (value) => {
                    if (typeof value === 'string' || !value) return true;
                    return value && value.size <= 2000000;
                }),
        }),
        enableReinitialize: true,

        onSubmit: async (values) => {
            const changedValues = {};
            Object.entries(values).forEach(([key, value]) => {
                if (value !== initialValues[key]) {
                    changedValues[key] = value;
                }
            });

            if (Object.keys(changedValues).length >= 1) {
                const formData = new FormData();
                Object.entries(changedValues).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                updateAuthorDetails(formData);
            } else {
                console.log('No input changes!');
            }
        },
    });

    const updateAuthorDetails = async (formData) => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_SERVER_API_URL}/author/settings/${user_id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.status) {
                toast.success(response.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error updating details');
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('profileImage', file);
        formik.setFieldTouched('profileImage', true);
        setPreviewProfileImage(URL.createObjectURL(file));
    };

    const getAuthorDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/author/settings/${user_id}`);
            const author = response.data?.result?.author;
            const values = {
                name: author?.name || '',
                email: author?.email || '',
                password: '', // Password should always be empty for security reasons
                profileImage: author?.profileImage || null,
            };
            setInitialValues(values);

            if (author?.profileImage) {
                setPreviewProfileImage(`${import.meta.env.VITE_SERVER_MAIN_URL}/profile/${author.profileImage}`);
            }
        } catch (error) {
            console.error('Error fetching author details:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getAuthorDetails();
    }, []);

    return (
        <div className="p-4 bg-white rounded-2 w-50">
            <h4 className="section-title mb-4">Settings</h4>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <div className="invalid-feedback">{formik.errors.name}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${formik.errors.password && formik.touched.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="profileImage" className="form-label">Profile Image</label>
                    {previewProfileImage && (
                        <div className="preview-profile mx-auto mb-3" style={{ width: '150px', height: '150px', borderRadius: '50%' }}>
                            <img className="img-fluid h-100 rounded-circle" src={previewProfileImage} alt="Profile" />
                        </div>
                    )}
                    <input
                        type="file"
                        className={`form-control ${formik.errors.profileImage && formik.touched.profileImage ? 'is-invalid' : ''}`}
                        id="profileImage"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {formik.errors.profileImage && formik.touched.profileImage && (
                        <div className="invalid-feedback">{formik.errors.profileImage}</div>
                    )}
                </div>

                <div className="d-flex mt-4">
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
