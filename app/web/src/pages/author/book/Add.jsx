import React from 'react'

const Add = () => {
  return (
    <div className='p-4 bg-white rounded-2 w-50'>
      <h4 className='section-title mb-4'>Add New Book</h4>
      <form >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="publicationDate" className="form-label">Publication Date</label>
          <input
            type="date"
            className="form-control"
            id="publicationDate"
            name="publicationDate"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price ($)</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
          <input
            type="file"
            className="form-control"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
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
  )
}

export default Add