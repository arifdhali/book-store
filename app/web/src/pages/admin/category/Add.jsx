import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";


const CategoryAdd = () => {

    const formik = useFormik({
        initialValues: {
            category_name: "",
            category_desc: ""
        },
        validationSchema: Yup.object({
            category_name: Yup.string()
                .required("Name is required"),
            category_desc: Yup.string()
                .required("Description is required")
        }),
        onSubmit: value => {
            console.log(value);
        }
    })




    return (
        <>
            <div className='p-4 bg-white rounded-2 w-50'>
                <form id="category-form" autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="category_name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className={`form-control ${formik.errors.category_name && formik.touched.category_name ? 'is-invalid' : ''}`}
                            id="category_name"
                            name="category_name"
                            placeholder="Enter category Name"
                            onChange={formik.handleChange}
                            value={formik.values.category_name}
                        />
                        {formik.errors.category_name && formik.touched.category_name ? (
                            <div className="invalid-feedback">{formik.errors.category_name}</div>
                        ) : null}
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="category_desc" className="form-label">
                            Description
                        </label>

                        <textarea
                            className={`form-control ${formik.errors.category_desc && formik.touched.category_desc ? 'is-invalid' : ''}`}
                            id="category_desc"
                            name="category_desc"
                            placeholder="Enter Description"
                            onChange={formik.handleChange}
                            value={formik.values.category_desc}></textarea>
                        {formik.errors.category_desc && formik.touched.category_desc ? (
                            <div className="invalid-feedback">{formik.errors.category_desc}</div>
                        ) : null}
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-danger me-3" >
                            <i className="fa-solid fa-check" /> Reset
                        </button>
                        <button type="submit" className="btn btn-primary ">
                            <i className="fa-solid fa-check" /> Submit
                        </button>
                    </div>
                </form >

            </div >
        </>
    )
}

export default CategoryAdd