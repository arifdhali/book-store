import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AppRoute from "../../../routes/routes";
import * as Yup from "yup";
import { useFormik } from "formik";

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

    console.log(formik.errors);

    return (
        <div className="col-md-4 ">
            <div className="card bg-white p-4 rounded-2 shadow-lg border-0">
                <div className="card-body">
                    <div className="text-center">
                        <div className='fs-1 '>
                            <FontAwesomeIcon icon={faUnlockKeyhole} />
                        </div>
                        <h2 className="text-center my-4">Forgot Password?</h2>
                        <div className="card-body">
                            <form id="forgot-form" role="form" autoComplete="off" className="form" onSubmit={formik.handleSubmit}  >
                                <div className="form-group mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur.t} value={formik.values.email} id="email" name="email" placeholder="Email address"
                                            className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                                            type="email" />

                                        {formik.errors.email && formik.touched.email ? (
                                            <div className="invalid-feedback text-start">{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    {/* <input name="recover-submit" className="btn btn-lg btn-primary btn-block" defaultValue="Reset Password" type="submit" /> */}
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <Link to={AppRoute.AUTH.AUTHOR.LOGIN}>Go back</Link>
                                        <button className='btn btn-primary'>Reset Password</button>
                                    </div>
                                </div>
                                <input type="hidden" className="d-none" name="token" id="token" defaultValue="" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass