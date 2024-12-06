import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Add = () => {
  const [previewBookImage, setPreviewBookImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      price: "",
      thumbnail: null,
      status: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      date: Yup.date().nullable().required("Date is required"),
      price: Yup.number().required("Price is required"),
      status: Yup.string().required("Please select a status"),
      thumbnail: Yup.mixed().required("Thumbnail is required"),
    }),
    onSubmit: (values) => {
      handelFormSubmit(values);
    }
  });

  const handelFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("thumbnail", file);
    setPreviewBookImage(URL.createObjectURL(file));
  };

  const handelFormSubmit = (data) => {
    console.log(data);
  };

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
          <label htmlFor="date" className="form-label">Publication Date</label>
          <input
            type="date"
            className={`form-control ${formik.errors?.date && formik.touched?.date ? "is-invalid" : ""}`}
            id="date"
            name="date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors?.date && formik.touched?.date ? (
            <div className="invalid-feedback">{formik.errors?.date}</div>
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
            <option value={'default'} >Select Status</option>
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
