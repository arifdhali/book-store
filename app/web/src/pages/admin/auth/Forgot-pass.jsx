import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faEnvelope, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AppRoutes from "@/routes/routes";
import * as Yup from "yup";
import { useFormik } from "formik";
import Logo from "@/assets/image/store_logo.png";

const ForgotPass = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Email is required")
                .email("Enter valid email address")
        })

    })
    useEffect(() => {
        const { errors } = formik;
        let errorskey = Object.keys(errors);        
        let element = document.querySelector(`[name=${errorskey[0]}]`);
        console.log(element);
        if(element){
            element.focus();
        }

    }, [formik.isSubmitting])
    return (
        <>
            <div className='col-md-6 p-0'>
                <div className='position-relative left rounded-2 overflow-hidden'>
                    <div className="position-absolute px-3 py-2 w-100 top d-flex align-items-center justify-content-between z-3">
                        <img className='logo img-fluid' src={Logo} alt="Logo" />
                        <div>
                            <Link to={AppRoutes.HOME} className='back-to rounded-5 text-white d-inline-flex align-items-center gap-2'>
                                Back to website <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <img
                            className="img-fluid w-100"
                            src="https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWV8ZW58MHwxfDB8fHww"
                            alt="Background"
                        />
                    </div>
                </div>
            </div>

            <div className="col-md-6 p-5">
                <h2 className='text-white title mb-0'>Forgot Password?</h2>
                <small className='already-have'>
                    Enter your email address to reset password.
                </small>

                <div className='mt-4'>
                    <form id="forgot-form" role="form" autoComplete="off" className="form" onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter email"
                                value={formik.values.email}
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="form-group mb-3">
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link to={AppRoutes.AUTH.ADMIN.LOGIN}>Go back</Link>
                                <button className='btn btn-primary'>Reset Password</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default ForgotPass