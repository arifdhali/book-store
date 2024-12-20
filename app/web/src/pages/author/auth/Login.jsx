import React, { useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppRoutes from "../../../routes/routes";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

const Login = () => {
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
      sendToDatabse(values)
    }
  });

  const sendToDatabse = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTH.AUTHOR.LOGIN}`, values, {
        withCredentials: true,
      });
      const { status } = response.data.result;
      if (status) {
        navigate(AppRoutes.AUTHOR.BASE);
        toast.success(response.data.result.message)
      }
    } catch (error) {
      console.error('Error during login request:', error);
      const { message } = error.response.data.result;
      toast.error(message)
    }
  }

  useEffect(() => {
    if (authorToken) {
      navigate(AppRoutes.AUTHOR.BASE);
    }
  }, [authorToken])

  return (
    <div className='col-md-4 '>
      <div className='card bg-white p-4 rounded-2 shadow-lg border-0'>
        <div className='card-body pb-0'>
          <div className='text-center mb-4'>
            <h2>Hi, Author</h2>
            <p>Enter your credentials to continue</p>
          </div>
          <form className="form" onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
              <input
                type="email"
                name="email"
                className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Enter email'
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <input
                type="password"
                name="password"
                className={`form-control ${formik.errors.password && formik.touched.password ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Enter password'
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className='mb-4'>
              <small>
                <Link to={AppRoutes.AUTH.AUTHOR.FORGOTPASS}>Forgot password?</Link>
              </small>
            </div>
            <div>
              <button type="submit" className='btn btn-primary w-100 justify-content-center py-3'>Login</button>
            </div>

            <div className='mt-4 mb-0'>
              <p>Dont have an account ? <Link to={AppRoutes.AUTH.AUTHOR.REGISTER}>Signup</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
