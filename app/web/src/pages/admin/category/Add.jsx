import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import AppRoutes from '../../../routes/routes';
import { toast } from 'react-toastify';

const CategoryAdd = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            description: Yup.string()
                .min(100, 'Description must be at least 100 characters long')
                .required('Description is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.ADMIN.CATEGORY.ADD}`,
                    values
                );
                toast.success(response.data?.result.message);
                formik.resetForm();
            } catch (error) {
                toast.error(error?.response.data?.result.message);                
                console.log('Failed to add category. Please try again.');
            }
        },
    });

    return (
        <div className="p-4 bg-white rounded-2 w-50">
            <form id="category-form" autoComplete="off" onSubmit={formik.handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''
                            }`}
                        id="name"
                        name="name"
                        placeholder="Enter category Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <div className="invalid-feedback">{formik.errors.name}</div>
                    )}
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className={`form-control ${formik.errors.description && formik.touched.description
                                ? 'is-invalid'
                                : ''
                            }`}
                        id="description"
                        name="description"
                        placeholder="Enter Description (at least 100 characters)"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    ></textarea>
                    {formik.errors.description && formik.touched.description && (
                        <div className="invalid-feedback">{formik.errors.description}</div>
                    )}
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-danger me-3" onClick={formik.resetForm}>
                        <i className="fa-solid fa-check" /> Reset
                    </button>
                    <button type="submit" className="btn btn-primary">
                        <i className="fa-solid fa-check" /> Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryAdd;
