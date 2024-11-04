import React from 'react'
import { Link } from 'react-router-dom'
import AppRoute from "../../../routes/routes"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBell, faTrashCan, faIcons, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const Authors = () => {
  return (
    <div className='p-4 bg-white rounded-2'>
      <>
        <div className='d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom'>
          <h4 className='section-title m-0'>Author List</h4>
          <div>
            <Link to={`${AppRoute.ADMIN.AUTHORS.ADD}`} className="btn btn-primary align-content-center">Add Author</Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>no</th>
              <th>profile</th>
              <th>name</th>
              <th>email</th>
              <th style={{ width: "450px" }}>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td valign='middle'>1</td>
              <td valign='middle'>
                <img className='user-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s" alt="" />
              </td>
              <td valign='middle'>Jhone Steben</td>
              <td valign='middle'>Jhone.Steben12@gmail.com</td>
              <td valign='middle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque.
                Etiam feugiat luctus est, vel commodo odio rhoncus sit amet. </td>
              <td valign='middle'>active</td>
              <td valign='middle'>
                <div className='d-flex gap-2 item-actions'>
                  <Link className='act edit' to={`${AppRoute.ADMIN.AUTHORS.VIEW(1)}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>

                  <span role='button' className='act delete' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td valign='middle'>1</td>
              <td valign='middle'>
                <img className='user-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s" alt="" />
              </td>
              <td valign='middle'>Jhone Steben</td>
              <td valign='middle'>Jhone.Steben12@gmail.com</td>
              <td valign='middle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque.
                Etiam feugiat luctus est, vel commodo odio rhoncus sit amet. </td>
              <td valign='middle'>active</td>
              <td valign='middle'>
                <div className='d-flex gap-2 item-actions'>
                  <Link className='act edit' to={`${AppRoute.ADMIN.AUTHORS.VIEW(1)}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>

                  <span role='button' className='act delete' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td valign='middle'>1</td>
              <td valign='middle'>
                <img className='user-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s" alt="" />
              </td>
              <td valign='middle'>Jhone Steben</td>
              <td valign='middle'>Jhone.Steben12@gmail.com</td>
              <td valign='middle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque.
                Etiam feugiat luctus est, vel commodo odio rhoncus sit amet. </td>
              <td valign='middle'>active</td>
              <td valign='middle'>
                <div className='d-flex gap-2 item-actions'>
                  <Link className='act edit' to={`${AppRoute.ADMIN.AUTHORS.VIEW(1)}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>

                  <span role='button' className='act delete' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
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
