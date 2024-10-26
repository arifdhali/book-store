import React from 'react'
import { Link } from 'react-router-dom'
import AppRoute from "../../../routes/routes"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBell, faTrashCan, faIcons, faEye } from '@fortawesome/free-solid-svg-icons';

const Authors = () => {
  return (
    <div>
      <>
        <div className='d-flex justify-content-between mb-2'>
          <h2>Author list</h2>
          <div>
            <Link to={`${AppRoute.ADMIN.AUTHORS.ADD}`} className="btn btn-primary align-content-center">Add Author</Link>
          </div>
        </div>

        <table className="table">
          <thead className="table-dark">
            <tr>
              <td>Id</td>
              <td>user name</td>
              <td>Order</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td valign='middle'>1</td>
              <td valign='middle'>lorem122</td>
              <td valign='middle'>2</td>
              <td valign='middle'>active</td>
              <td valign='middle'>
                <div className='d-flex gap-2'>
                  <Link className='btn btn-warning align-content-center' to={`${AppRoute.ADMIN.AUTHORS.VIEW(1)}`}>
                    <FontAwesomeIcon className='text-white' icon={faEye} />
                  </Link>

                  <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Delete
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">Are you sure ?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>


      </>

    </div>
  )
}

export default Authors
