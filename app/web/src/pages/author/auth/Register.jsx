import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import AppRoute from "../../../routes/routes"
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [previewBookImage, setPreviewBookImage] = useState(null);
    const [togglePassword, setTogglePassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            bio: "",
            dob: "",
            thumbnail: null,
            address: "",
            phone_no: "",
            social_link: {
                facebook: "",
                linkedin: "",
                instagram: "",
            },
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Please enter a valid email").required("Email is required"),
            bio: Yup.string().required("Bio is required").min(100, "Minimum 100 words"),
            dob: Yup.date()
                .required("Date of birth is required")
                .test(
                    "is-18-plus",
                    "You must be at least 18 years old",
                    (value) => {
                        if (!value) return false;
                        const today = new Date();
                        const ageThreshold = new Date(today.setFullYear(today.getFullYear() - 18));
                        return value <= ageThreshold;
                    }
                ),
            thumbnail: Yup.mixed().required("Profile image is required").test(
                "fileType",
                "Only image files are allowed",
                (value) => value && value.type.startsWith("image/")
            ),
            address: Yup.string().required("Address is required"),
            phone_no: Yup.string().required("Phone number is required"),
            social_link: Yup.object({
                facebook: Yup.string().url("Please enter a valid URL"),
                linkedin: Yup.string().url("Please enter a valid URL"),
                instagram: Yup.string().url("Please enter a valid URL")
            }),
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 chracters")
        }),
        onSubmit: async (values) => {
            const form_data = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === "social_link") {
                    form_data.append(key, JSON.stringify(value));
                } else {
                    form_data.append(key, value);
                }
            })
            await handelFormSubmit(form_data);
        }
    });

    const handelFileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("thumbnail", file);
        setPreviewBookImage(URL.createObjectURL(file));
    };

    const handelFormSubmit = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.AUTH.AUTHOR.REGISTER}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => console.log(response));
        } catch (error) {
            console.log('error while registering', error);
        }
    };

    return (
        <div className='p-4 bg-white rounded-2' style={{ maxWidth: "600px" }}>
            <h4 className='section-title mb-4'>Create new account</h4>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${formik.errors?.name && formik.touched?.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors?.name && formik.touched?.name ? (
                        <div className="invalid-feedback">{formik.errors?.name}</div>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        className={`form-control ${formik.errors?.email && formik.touched?.email ? "is-invalid" : ""}`}
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors?.email && formik.touched?.email ? (
                        <div className="invalid-feedback">{formik.errors?.email}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="bio" className="form-label">Bio</label>
                    <textarea
                        className={`form-control ${formik.errors?.bio && formik.touched?.bio ? "is-invalid" : ""}`}
                        id="bio"
                        name="bio"
                        onChange={formik.handleChange}
                        value={formik.values.bio}
                    />
                    {formik.errors?.bio && formik.touched?.bio ? (
                        <div className="invalid-feedback">{formik.errors?.bio}</div>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of Birth <span className='example'>(DOB)</span></label>
                    <input
                        type="date"
                        className={`form-control ${formik.errors?.dob && formik.touched?.dob ? "is-invalid" : ""}`}
                        id="dob"
                        name="dob"
                        onChange={formik.handleChange}
                        value={formik.values.dob}
                    />
                    {formik.errors?.dob && formik.touched?.dob ? (
                        <div className="invalid-feedback">{formik.errors?.dob}</div>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label htmlFor="thumbnail" className="form-label">Profile Image</label>
                    {previewBookImage && (
                        <div className='preview-profile mx-auto mb-3' style={{ width: "200px", height: "150px" }}>
                            <img className='img-fluid h-100' src={previewBookImage} alt="" />
                        </div>
                    )}
                    <input
                        type="file"
                        className={`form-control ${formik.errors?.thumbnail && formik.touched?.thumbnail ? "is-invalid" : ""}`}
                        id="thumbnail"
                        name="thumbnail"
                        accept="image/*"
                        onChange={handelFileChange}
                    />
                    {formik.errors?.thumbnail && formik.touched?.thumbnail ? (
                        <div className="invalid-feedback">{formik.errors?.thumbnail}</div>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                        name="address"
                        id="address"
                        className={`form-control ${formik.errors?.address && formik.touched?.address ? "is-invalid" : ""}`}
                        onChange={formik.handleChange}
                        value={formik.values.address}
                    />
                    {formik.errors?.address && formik.touched?.address ? (
                        <div className="invalid-feedback">{formik.errors?.address}</div>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label htmlFor="phone_no" className="form-label">Phone No</label>
                    <input
                        type="text"
                        className={`form-control ${formik.errors?.phone_no && formik.touched?.phone_no ? "is-invalid" : ""}`}
                        id="phone_no"
                        name="phone_no"
                        onChange={formik.handleChange}
                        value={formik.values.phone_no}
                    />
                    {formik.errors?.phone_no && formik.touched?.phone_no ? (
                        <div className="invalid-feedback">{formik.errors?.phone_no}</div>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label className="form-label">Social Links</label>
                    <input
                        type="url"
                        className={`mb-2 form-control ${formik.errors?.social_link?.facebook && formik.touched?.social_link?.facebook ? "is-invalid" : ""}`}
                        id="facebook"
                        name="social_link.facebook"
                        placeholder='https://www.facebook.com/'
                        onChange={formik.handleChange}
                        value={formik.values.social_link.facebook}
                    />
                    {formik.errors?.social_link?.facebook && formik.touched?.social_link?.facebook && (
                        <div className="invalid-feedback">{formik.errors?.social_link?.facebook}</div>
                    )}
                    <input
                        type="url"
                        className={`mb-2 form-control ${formik.errors?.social_link?.instagram && formik.touched?.social_link?.instagram ? "is-invalid" : ""}`}
                        id="instagram"
                        name="social_link.instagram"
                        placeholder='https://www.instagram.com/'
                        onChange={formik.handleChange}
                        value={formik.values.social_link.instagram}
                    />
                    {formik.errors?.social_link?.instagram && formik.touched?.social_link?.instagram && (
                        <div className="invalid-feedback">{formik.errors?.social_link?.instagram}</div>
                    )}
                    <input
                        type="url"
                        className={`mb-2 form-control ${formik.errors?.social_link?.linkedin && formik.touched?.social_link?.linkedin ? "is-invalid" : ""}`}
                        id="linkedin"
                        name="social_link.linkedin"
                        placeholder='https://www.linkedin.com/'
                        onChange={formik.handleChange}
                        value={formik.values.social_link.linkedin}
                    />
                    {formik.errors?.social_link?.linkedin && formik.touched?.social_link?.linkedin && (
                        <div className="invalid-feedback">{formik.errors?.social_link?.linkedin}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="position-relative">
                        <div>
                            <input
                                type={togglePassword ? "text" : "password"}
                                className={`form-control ${formik.errors?.password && formik.touched?.password ? "is-invalid" : ""}`}
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />

                            {formik.errors?.password ? (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}

                        </div>
                        <FontAwesomeIcon
                            style={{
                                width: "20px",
                                height: "16px",
                                top: "25px",
                                background: "#fff"
                            }}
                            role="button"
                            onClick={() => setTogglePassword(!togglePassword)}
                            className="position-absolute end-0 translate-middle"
                            icon={togglePassword ? faEye : faEyeSlash}
                        />
                    </div>
                </div>


                <button type="submit" className="btn btn-primary mt-4">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Register;
