import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";


const Add = () => {

    const formik = useFormik({
        initialValues: {
            author_name: "",
            email: "",
            bio: "",
            profile_img: null,
            prime_authors: "no",
        },
        validationSchema: Yup.object({
            author_name: Yup.string()
                .required("Author name is required"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            bio: Yup.string()
                .required("Description is required"),
            profile_img: Yup.mixed()
                .required("Profile image is required")

        }),
        onSubmit: value => {
            const form_data = new FormData();
            Object.entries(value).forEach(([key, data]) => {
                form_data.append(key, data)
            });
            AddAuthorSubmit(form_data);
        }
    })

    // handle the file
    const handleFileChange = (event) => {
        const image = event.target.files[0];
        formik.setFieldValue("profile_img", image);
    }

    // handle the submit
    const AddAuthorSubmit = (formData) => {
        console.log(formData);
    }


    return (
        <>
            <div className='p-4 bg-white rounded-2 w-50'>
                <form id="author-form" autoComplete="off" onSubmit={formik.handleSubmit}>
                    {/* Author Name */}
                    <div className="form-group mb-3">
                        <label htmlFor="author_name" className="form-label">
                            Author Name
                        </label>
                        <input
                            type="text"
                            className={`form-control ${formik.errors.author_name && formik.touched.author_name ? 'is-invalid' : ''}`}
                            id="author_name"
                            name="author_name"
                            placeholder="Enter Author Name"
                            onChange={formik.handleChange}
                            value={formik.values.author_name}
                        />
                        {formik.errors.author_name && formik.touched.author_name ? (
                            <div className="invalid-feedback">{formik.errors.author_name}</div>
                        ) : null}
                    </div>
                    {/* Email */}
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            placeholder="Enter Author Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {
                            formik.errors.email && formik.touched.email ? (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            ) : null
                        }
                    </div>
                    {/* Biography */}
                    <div className="form-group mb-3">
                        <label htmlFor="bio" className="form-label">
                            Description
                        </label>
                        <textarea
                            className={`form-control ${formik.errors.bio && formik.touched.bio ? 'is-invalid' : ''}`}
                            id="bio"
                            name="bio"
                            rows={4}
                            placeholder="Write a short biography"
                            onChange={formik.handleChange}
                            value={formik.values.bio}
                        />
                        {
                            formik.errors.bio && formik.touched.bio ? (
                                <div className="invalid-feedback">{formik.errors.bio}</div>
                            ) : null
                        }
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="formFile" className="form-label">Profile Image</label>
                        <input className={`form-control ${formik.errors.profile_img && formik.touched.profile_img ? 'is-invalid' : ''}`} name='profile_img' type="file" id="formFile"
                            onChange={handleFileChange}
                            onBlur={() => formik.setFieldTouched("profile_img")}
                        />
                        {
                            formik.errors.profile_img && formik.touched.profile_img ? (
                                <div className="invalid-feedback">{formik.errors.profile_img}</div>
                            ) : null
                        }
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
                                onChange={formik.handleChange}

                            />
                            <label className="form-check-label" htmlFor="premiumYes">
                                Yes (Premium Author)
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="premiumStatus"
                                id="premiumNo"
                                onChange={formik.handleChange}
                            />
                            <label className="form-check-label" htmlFor="premiumNo">
                                No (Non-Premium Author)
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">
                            <i className="fa-solid fa-check" /> Submit
                        </button>
                    </div>
                </form>

            </div >
        </>
    )
}

export default Add