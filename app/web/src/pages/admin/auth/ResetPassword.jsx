import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from "yup";
import AppRoutes from "@/routes/routes"

const ResetPassword = () => {
    let location = useLocation();
    let queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [showPass, setShowPass] = useState(false);

    let formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().required("Enter new password"),
            confirmPassword: Yup.string()
                .required("Enter confirm password")
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must be same'),
        }),
        onSubmit: async (values, { resetForm }) => {
            let sendingData = {
                password: values.confirmPassword,
                token:token,
            }
            let response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTH.ADMIN.RESET_PASSWORD}`, sendingData);
            console.log(response)
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        const { errors } = formik;
        let errorKeys = Object.keys(errors);
        let firstElement = document.querySelector(`[name=${errorKeys[0]}`);
        if (firstElement) {
            firstElement.focus();
        }
        console.log(token);
    }, [token, formik.isSubmitting]);

    return (
        <div className="reset-container">
            <h2 className="text-white title mb-0">Reset Your Password</h2>
            <form className='form mt-4' onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                    <input
                        type="password"
                        name="newPassword"
                        className={`form-control`}
                        placeholder="New password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.newPassword}
                    />
                    {formik.errors.newPassword && formik.touched.newPassword && (
                        <div className="error">{formik.errors.newPassword}</div>
                    )}
                </div>
                <div className="mb-4">
                    <div className='position-relative'>
                        <input
                            type={`${showPass ? 'text' : 'password'}`}
                            name="confirmPassword"
                            className={`form-control`}
                            placeholder="Confirm password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />

                        <div role='button' onClick={() => setShowPass(!showPass)} className='position-absolute top-50 translate-middle-y show-icon'>
                            <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} />
                        </div>
                    </div>
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                        <div className="error">{formik.errors.confirmPassword}</div>
                    )}
                </div>
                <button className='btn btn-primary w-100 py-3 d-flex justify-content-center' type="submit">Reset Password</button>
                
            </form>
        </div>
    );
};

export default ResetPassword;
