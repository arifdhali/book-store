import { faAngleRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppRoutes from "@/routes/routes"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Logo from "@/assets/image/store_logo.png";
import Google from "@/assets/image/google.png";
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const [isPending, startTransitions] = useTransition();
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .required("First name is required"),
            email: Yup.string()
                .email("Email is not invalid")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters long")
                .required("Password is required")
        }),
        onSubmit: (values, { resetForm }) => {
            sendingTOdatabase(values, resetForm)
        }
    });
    const sendingTOdatabase = async (value, resetForm) => {

        try {

            let response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTH.AUTHOR.REGISTER}`, value)
            console.log(response)
            if (response.data.status) {
                resetForm();
                toast.success(response.data.message)
                startTransitions(() => navigate(AppRoutes.AUTH.AUTHOR.LOGIN))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const { errors } = formik;
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            let firstElement = document.querySelector(`[name="${errorKeys[0]}"]`);
            if (firstElement) firstElement.focus();
        }
    }, [formik.isSubmitting]);
    return (
        <>
            <div className="col-md-6 p-0">
                <div className='position-relative left rounded-2 overflow-hidden'>
                    <div className="position-absolute px-3 py-2 w-100 top d-flex align-items-center justify-content-between z-3">
                        <img className='logo img-fluid' src={Logo} alt="Logo" />
                        <div>
                            <Link to={AppRoutes.HOME} className='back-to rounded-5 text-white d-inline-flex align-items-center gap-2'>
                                Back to website <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                    </div>
                    <Swiper
                        className="mySwiper"
                        modules={[Autoplay, Navigation, Pagination]}
                        loop={true}
                        slidesPerView={1}
                        autoplay={{ delay: 2000 }}
                        pagination={{ clickable: false }}
                        speed={2000}
                        noSwiping={true}
                        noSwipingClass="swiper-slide"
                    >
                        {[0, 0, 0].map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="position-relative">
                                    <img
                                        className="img-fluid w-100"
                                        src="https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWV8ZW58MHwxfDB8fHww"
                                        alt="Background"
                                    />
                                    <div className="item-content text-white mx-auto text-center position-absolute translate-middle start-50 w-100">
                                        <h4>Capturing Moments, Creating Memories</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Right Section */}
            <div className="col-md-6 p-5">
                <h2 className='text-white title'>Create an account</h2>
                <small className='already-have'>
                    Already have an account?
                    <Link to={AppRoutes.AUTH.AUTHOR.LOGIN} className='text-underline ms-2'>Login</Link>
                </small>

                {/* Registration Form */}
                <div className='mt-4'>
                    <form onSubmit={formik.handleSubmit} className="form">
                        <div className='d-flex justify-content-between gap-3 mb-3'>
                            <div>
                                <label htmlFor="firstname">First</label>
                                <input
                                    id="firstname"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    name='first_name'
                                    onBlur={formik.handleBlur}
                                    className={`form-control ${formik.errors.first_name && formik.touched.first_name ? 'input-error' : ''}`}
                                    type="text"
                                    placeholder='First Name'
                                />
                                {formik.errors.first_name && formik.touched.first_name && (
                                    <small className="error">{formik.errors.first_name}</small>
                                )}
                            </div>
                            <div>
                                <label htmlFor="lastname">Last</label>
                                <input
                                    id="lastname"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    name='last_name'
                                    onBlur={formik.handleBlur}
                                    className={`form-control`}
                                    type="text"
                                    placeholder='Last Name'
                                />

                            </div>
                        </div>

                        <div className="mb-3 position-relative">
                            <label htmlFor="email">Email</label>
                            <input
                                id='email'
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control ${formik.errors.email && formik.touched.email ? 'input-error' : ''}`}
                                type="email"
                                placeholder='Email'
                            />
                            {formik.errors.email && formik.touched.email && (
                                <small className="error">{formik.errors.email}</small>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-3 ">
                            <label htmlFor="password">Password</label>
                            <div className='position-relative'>
                                <input
                                    id='password'
                                    value={formik.values.password}
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type={`${showPassword ? 'text' : 'password'}`}
                                    className={`form-control ${formik.errors.password && formik.touched.password ? 'input-error' : ''}`}
                                    placeholder="Enter password"
                                />
                                <div role='button' onClick={() => setShowPassword(!showPassword)} className='position-absolute top-50 translate-middle-y show-icon'>
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </div>
                            </div>
                            {formik.errors.password && formik.touched.password && (
                                <small className="error">{formik.errors.password}</small>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className='mt-5'>
                            <button type="submit" className='btn btn-primary w-100 text-center d-flex justify-content-center'>
                                {isPending ? 'Creating...' : 'Create account'}
                            </button>
                        </div>
                    </form>

                    {/* Alternative Login */}
                    <div className='alternative-login text-center'>
                        <div className='or-register my-4'>
                            <small>Or register with</small>
                        </div>
                        <button className='btn text-white d-flex gap-2 justify-content-center'>
                            <img src={Google} alt="Google" />
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
