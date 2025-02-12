import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AppRoutes from "../../../routes/routes";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify"
const EditBook = () => {
  const navigate = useNavigate();
  const { id, book_quantity } = useSelector((state) => state.authors.user);
  const { BOOK_ID } = useParams();
  const [previewBookImage, setPreviewBookImage] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: '',
    category_id: '',
    date: '',
    quantity: '',
    price: '',
    thumbnail: null,
    status: 'draft',
    max_quantity: "",
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      category_id: Yup.string().required("Please select a category"),
      date: Yup.date().required("Publication date is required"),
      quantity: Yup.number()
        .min(1, "Quantity must be at least 1")
        .when([], {
          is: () => initialValues.max_quantity !== null,
          then: (schema) => schema.max(initialValues.max_quantity, `Maximum you can ${initialValues.max_quantity} add Quantity`)
        })
        .typeError("Quantity must be a number"),
      price: Yup.number().required("Price is required"),
      status: Yup.string().required("Please select a status"),
      thumbnail: Yup.mixed()
        .required("Thumbnail is required")
        .test("fileSize", "File is too large (max-size 2MB)", (value) => {
          if (typeof value === "string" || !value) return true;
          return value && value.size <= 2000000;
        }),
    }),
    enableReinitialize: true,

    onSubmit: async (values) => {
      const changedValues = {};
      Object.entries(values).forEach(([key, value]) => {
        if (value !== initialValues[key]) {
          changedValues[key] = value;
        }
      });
      //  if changedValues has any values in the object  then do this
      if (Object.keys(changedValues).length >= 1) {
        const formData = new FormData();
        Object.entries(changedValues).forEach(([key, value]) => {
          formData.append(key, value);
        });
        updateBooks(formData);
      } else {
        console.log("No input changes!.")
      }
    },
  });

  const updateBooks = async (formData) => {
    try {
      let response = await axios.patch(`${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.BOOK.SINGLE(BOOK_ID)}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      if (response.data.status) {
        toast.success(response.data.message)
        navigate(`${AppRoutes.AUTHOR.BOOK.LIST}`)
      }

    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("thumbnail", file);
    formik.setFieldTouched("thumbnail", true);
    setPreviewBookImage(URL.createObjectURL(file));
  };

  const getBook = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}${AppRoutes.AUTHOR.BOOK.SINGLE(BOOK_ID)}`, {
        params: {
          author: id,
          bookID: BOOK_ID,
        }
      });

      const book = response.data?.result?.book[0];
      const values = {
        title: book?.name || '',
        category_id: book?.category_id || '',
        category_name: book?.category_name || '',
        date: book?.publication_date
          ? new Date(book.publication_date).toISOString().split("T")[0]
          : '',
        quantity: book?.quantity || '',
        price: book?.price || '',
        status: book?.status || '',
        thumbnail: book?.thumbnail || null,
        max_quantity: book.book_quantity
      };
      setInitialValues(values);

      if (book?.thumbnail) {
        setPreviewBookImage(`${import.meta.env.VITE_SERVER_MAIN_URL}/book/${book.thumbnail}`);
      }
    } catch (error) {
      console.error("Error fetching the book:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getBook();
  }, [BOOK_ID]);

  return (
    <div className="p-4 bg-white rounded-2 w-50">
      <h4 className="section-title mb-4">Edit Book</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${formik.errors.title && formik.touched.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formik.errors.title && formik.touched.title && (
            <div className="invalid-feedback">{formik.errors.title}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={formik.values.category_name || 'No category selected'}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Publication Date</label>
          <input
            type="date"
            className={`form-control ${formik.errors.date && formik.touched.date ? 'is-invalid' : ''}`}
            id="date"
            name="date"
            readOnly
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date && (
            <div className="invalid-feedback">{formik.errors.date}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            className={`form-control ${formik.errors.quantity && formik.touched.quantity ? 'is-invalid' : ''}`}
            id="quantity"
            name="quantity"
            onChange={formik.handleChange}
            value={formik.values.quantity}
          />
          {formik.errors.quantity && formik.touched.quantity && (
            <div className="invalid-feedback">{formik.errors.quantity}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price ($)</label>
          <input
            type="number"
            className={`form-control ${formik.errors.price && formik.touched.price ? 'is-invalid' : ''}`}
            id="price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          {formik.errors.price && formik.touched.price && (
            <div className="invalid-feedback">{formik.errors.price}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
          {previewBookImage && (
            <div className="preview-profile mx-auto mb-3" style={{ width: '200px', height: '150px' }}>
              <img className="img-fluid h-100" src={previewBookImage} alt="Book Thumbnail" />
            </div>
          )}
          <input
            type="file"
            className={`form-control ${formik.errors.thumbnail && formik.touched.thumbnail ? 'is-invalid' : ''}`}
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
          />
          {formik.errors.thumbnail && formik.touched.thumbnail && (
            <div className="invalid-feedback">{formik.errors.thumbnail}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className={`form-control ${formik.errors.status && formik.touched.status ? 'is-invalid' : ''}`}
            id="status"
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {formik.errors.status && formik.touched.status && (
            <div className="invalid-feedback">{formik.errors.status}</div>
          )}
        </div>

        <div className="d-flex  mt-4">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
