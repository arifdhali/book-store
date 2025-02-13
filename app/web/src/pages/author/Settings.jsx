import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AppRoutes from "@/routes/routes"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setAuthor } from '@/store/slices/author/AuthorSlice';
const Settings = () => {
    const dispatch = useDispatch();
    const { id } = useSelector((state) => state.authors?.user)
    const [previewProfileImage, setPreviewProfileImage] = useState(null);
    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
        profileImage: null,
        bio: '',
        dob: '',
        address: '',
        phone_no: '',
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            bio: Yup.string().max(150, 'Bio cannot exceed 150 characters'),
            dob: Yup.date().nullable(),
            address: Yup.string().max(100, 'Address cannot exceed 100 characters'),
            phone_no: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits'),
            profileImage: Yup.mixed()
                .nullable()
                .test('fileSize', 'File size must be less than 2MB', (value) => {
                    if (!value || typeof value === 'string') return true;
                    return value.size <= 2 * 1024 * 1024;
                }),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (value !== initialValues[key]) {
                    formData.append(key, value);
                }
            });
            let hasChanged = false;
            for (let key of formData.entries()) {
                hasChanged = key.length > 1 ? true : false;
            }
            if (!hasChanged) {
                toast.error("Please update atleast one field");
                return;
            }
            try {
                const response = await axios.patch(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.SETTINGS}`, formData, {
                    params: {
                        userID: id
                    },
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (response.data.status) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.error('Error updating author details:', error);
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('profileImage', file);
        setPreviewProfileImage(URL.createObjectURL(file));
    };

    const getAuthorDetails = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.SETTINGS}`, {
                params: {
                    userID: id
                }
            });
            let author = data?.author[0];
            // Format the dob to 'YYYY-MM-DD'
            const formattedDob = author?.dob ? new Date(author?.dob).toISOString().split('T')[0] : '';

            setInitialValues({
                email: author?.email || '',
                bio: author?.bio || '',
                dob: formattedDob,
                address: author?.address || '',
                phone_no: author?.phone_no || '',
                profileImage: author?.profile_img || null,
            });

            if (author?.profile_img) {
                setPreviewProfileImage(`${import.meta.env.VITE_SERVER_MAIN_URL}author/${author?.profile_img}`);
            }

            if (formik.isValid) {
                dispatch(setAuthor({
                    type: "update_profile_photo",
                    data: author?.profile_img
                }))
            }

        } catch (error) {
            console.error('Error fetching author details:', error);
        }
    };


    useEffect(() => {
        getAuthorDetails();
    }, [id, formik.isSubmitting]);

    return (
        <div className="p-4 bg-white rounded-2 w-50">
            <h4 className="section-title mb-4">Settings</h4>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        placeholder='Enter email'
                        type="email"
                        id="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="profileImage" className="form-label">Profile Image</label>
                    {previewProfileImage && (
                        <div className="mb-3">
                            <img
                                src={previewProfileImage}
                                alt="Profile Preview"
                                className="img-thumbnail"
                                style={{ maxWidth: '150px' }}
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        id="profileImage"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="bio" className="form-label">Bio</label>
                    <textarea
                        placeholder='Enter Biodata'
                        id="bio"
                        className={`form-control ${formik.touched.bio && formik.errors.bio ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('bio')}
                        rows="3"
                    ></textarea>
                    {formik.touched.bio && formik.errors.bio && (
                        <div className="invalid-feedback">{formik.errors.bio}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input
                        placeholder='Enter Dob'
                        type="date"
                        id="dob"
                        className={`form-control ${formik.touched.dob && formik.errors.dob ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('dob')}

                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        placeholder='Enter Address'
                        type="text"
                        id="address"
                        className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('address')}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone_no" className="form-label">Phone Number</label>
                    <input
                        placeholder='Enter phone no'
                        type="tel"
                        id="phone_no"
                        className={`form-control ${formik.touched.phone_no && formik.errors.phone_no ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('phone_no')}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default Settings;
