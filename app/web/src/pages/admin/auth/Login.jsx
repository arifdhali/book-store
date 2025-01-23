import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppRoutes from "../../../routes/routes";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { login } from '../../../store/slices/authSlice';
import Header_alert from '../../../utils/Header_alert';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const token = Cookies.get("ADMIN_TOKEN");

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
      sendToDatabase(values)
    }
  });
  
  const sendToDatabase = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTH.ADMIN.LOGIN}`, values);
      const { status } = response.data.result;
      if (status) {
        navigate(AppRoutes.ADMIN.BASE);
        toast.success(response.data.result.message)
      }else{
        toast.error(response.data.result.message)
      }      
    } catch (error) {      
      const { message } = error.response.data.result;
      toast.error(message)
    }
  };
  useEffect(() => {
    if (token) {
      navigate(AppRoutes.ADMIN.BASE);
    }
  }, [])

  return (
    <div className='col-md-4 '>
      <Header_alert userrole='Admin' />
      <div className='card bg-white p-4 rounded-2 shadow-lg border-0'>
        <div className='card-body'>
          <div className='text-center mb-4'>
            <h2>Hi, Admin</h2>
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
                <Link to={AppRoutes.AUTH.ADMIN.FORGOTPASS}>Forgot password?</Link>
              </small>
            </div>
            <div>
              <button type="submit" className='btn btn-primary w-100 justify-content-center py-3'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
