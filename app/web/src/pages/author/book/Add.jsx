import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AppRoutes from "../../../routes/routes";
import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
const Add = () => {
  const [previewBookImage, setPreviewBookImage] = useState(null);
  const [BookCategory, setBookCategory] = useState([]);
  const author_cookie = jwtDecode(Cookies.get("AUTHOR_TOKEN"));
  const navigate = useNavigate();

  let { user_id, subscription_type, book_quantity } = author_cookie?.user?.data;
  const formik = useFormik({
    initialValues: {
      user_id: user_id,
      title: "",
      category_id: "",
      date: "",
      quantity: "",
      price: "",
      thumbnail: null,
      status: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      category_id: Yup.string().required("Please select a category"),
      date: Yup.date()
        .required("Date is required")
        .min(format(new Date(), 'yyyy-MM-dd'), "Start Date cannot be in the past"),
      quantity: Yup.number()
        .required("Quantity is required")
        .min(1, "Quantity must be at least 1")
        .when([], {
          is: () => book_quantity != null,
          then: schema => schema.max(book_quantity, `Maximum you can add ${book_quantity} Quantity`)
        })
        .typeError("Quantity must be a number"),
      price: Yup.number().required("Price is required")
        .typeError("Price must be a number"),
      status: Yup.string().required("Please select a status"),
      thumbnail: Yup.mixed().required("Thumbnail is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      handelFormSubmit(values, resetForm);
    }
  });
  const handelFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("thumbnail", file);
    setPreviewBookImage(URL.createObjectURL(file));
  };


  const handelFormSubmit = async (data, resetForm) => {
    try {
      const form_data = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        form_data.append(key, value);
      })
      form_data.append('subscription_type', subscription_type);
      let response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.BOOK.ADD}`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status) {
        toast.success(response.data.message);
        resetForm();
        navigate(AppRoutes.AUTHOR.BOOK.LIST);
      }
      if (!response.data.status) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('error', error)
    }

  };
  const getAllCategory = async () => {
    try {

      let response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.BOOK.CATEGORY}`)
      setBookCategory(response?.data?.category);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])

  return (
    <div className='p-4 bg-white rounded-2 w-50'>
      <h4 className='section-title mb-4'>Add New Book</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${formik.errors?.title && formik.touched?.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formik.errors?.title && formik.touched?.title ? (
            <div className="invalid-feedback">{formik.errors?.title}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Select Category</label>
          <select
            className={`form-control ${formik.errors?.category_id && formik.touched.category_id ? "is-invalid" : ""}`}
            id="category"
            name="category_id"
            onChange={formik.handleChange}
            value={formik.values.category_id}
          >
            <option value={""}>Select Category</option>
            {
              BookCategory.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
            }
          </select>
          {formik.errors?.category_id && formik.touched.category_id ? (
            <div className="invalid-feedback">{formik.errors?.category_id}</div>
          ) : null}
        </div>


        <div className="mb-3">
          <label htmlFor="date" className="form-label">Publication Date</label>
          <input
            type="date"
            className={`form-control ${formik.errors?.date && formik.touched?.date ? "is-invalid" : ""}`}
            id="date"
            name="date"
            onChange={formik.handleChange}
            value={formik.values.date}
            min={format(new Date(), 'yyyy-MM-dd')}
          />
          {formik.errors?.date && formik.touched?.date ? (
            <div className="invalid-feedback">{formik.errors?.date}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="text"
            className={`form-control ${formik.errors?.quantity && formik.touched?.quantity ? "is-invalid" : ""}`}
            id="quantity"
            name="quantity"
            onChange={formik.handleChange}
            value={formik.values.quantity}
          />
          {formik.errors?.quantity && formik.touched?.quantity ? (
            <div className="invalid-feedback">{formik.errors?.quantity}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price ($)</label>
          <input
            type="text"
            className={`form-control ${formik.errors?.price && formik.touched?.price ? "is-invalid" : ""}`}
            id="price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          {formik.errors?.price && formik.touched?.price ? (
            <div className="invalid-feedback">{formik.errors?.price}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
          {previewBookImage && (
            <div className='preview-profile mx-auto mb-3' style={{ width: "200px", height: "150px" }}>
              <img className='img-fluid h-100' src={previewBookImage} alt="" />
            </div>
          )}
          <input
            type="file"
            className={`form-control ${formik.errors?.thumbnail && formik.touched?.thumbnail ? "is-invalid" : ""}`}
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handelFileChange}
          />
          {formik.errors?.thumbnail && formik.touched?.thumbnail ? (
            <div className="invalid-feedback">{formik.errors?.thumbnail}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className={`form-control ${formik.errors?.status && formik.touched.status ? "is-invalid" : ""}`}
            id="status"
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {formik.errors?.status && formik.touched.status ? (
            <div className="invalid-feedback">{formik.errors?.status}</div>
          ) : null}
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
