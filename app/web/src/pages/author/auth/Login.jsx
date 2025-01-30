import React, { useEffect, useState, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppRoutes from "@/routes/routes";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from "@/assets/image/store_logo.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
const Login = () => {
  const [isPending, startTransaction] = useTransition();
  const authorToken = Cookies.get("AUTHOR_TOKEN");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
    }),
    onSubmit: function (values) {
      sendToDatabse(values);
    }
  });

  const sendToDatabse = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTH.AUTHOR.LOGIN}`, values);
      if (response.data.result) {
        const { message } = response.data.result;
        toast.success(message);
        startTransaction(() => navigate(AppRoutes.AUTHOR.BASE));
      } else {
        throw response.data;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const { errors } = formik;
    let errorKeys = Object.keys(errors);
    let firstElement = document.querySelector(`[name=${errorKeys[0]}`)
    if (firstElement) {
      firstElement.focus();
    }
    if (authorToken) {
      navigate(AppRoutes.AUTHOR.BASE);
    }
  }, [authorToken, formik.isSubmitting]);

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

          <Swiper
            className="mySwiper"
            modules={[Autoplay, Pagination]}
            loop={true}
            slidesPerView={1}
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: false }}
            speed={2000}
            noSwiping={true}
            noSwipingClass="swiper-slide"
          >
            {
              [0, 0, 0].map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="img-fluid w-100"
                    src="https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWV8ZW58MHwxfDB8fHww"
                    alt="Background"
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>

      <div className="col-md-6 p-5">
        <div className='mb-2'>
          <h2 className='mb-0 text-white title'>Welcome Back</h2>
          <small className='already-have'>
            Login to your account
          </small>
        </div>
        {/* Login Form */}
        <div className='mt-4'>
          <form onSubmit={formik.handleSubmit} className="form">
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
            <div className="mb-1">
              <input
                type="password"
                name="password"
                className={`form-control ${formik.errors.password && formik.touched.password ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter password"
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <small>
                <Link to={AppRoutes.AUTH.AUTHOR.FORGOTPASS}>Forgot password?</Link>
              </small>
            </div>
            <div>
              <button type="submit" className='btn btn-primary w-100 py-3 d-flex justify-content-center' disabled={isPending}>
                {isPending ? "Logging..." : "Login"}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className='mt-4 mb-0'>
            <p>Don't have an account? <Link to={AppRoutes.AUTH.AUTHOR.REGISTER}>Sign Up</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
