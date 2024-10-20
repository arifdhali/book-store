import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AppRoute from "../../../routes/routes";

const ForgotPass = () => {
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
                            <form id="forgot-form" role="form" autoComplete="off" className="form" method="post"  >
                                <div className="form-group mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faEnvelope} />

                                        </span>
                                        <input id="email" name="email" placeholder="Email address" className="form-control" type="email" />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    {/* <input name="recover-submit" className="btn btn-lg btn-primary btn-block" defaultValue="Reset Password" type="submit" /> */}
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <Link to={AppRoute.AUTH.ADMIN.LOGIN}>Go back</Link>
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