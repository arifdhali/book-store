import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppRoute from "../../../routes/routes"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBell, faTrashCan, faIcons, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const Authors = () => {
  const [Author, setAuthor] = useState();
  const [DeleteAuthorID, setDeleteAuthorId] = useState(null);
  const getAuthors = () => {
    axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.ADMIN.AUTHORS.LIST}`)
      .then((value) => setAuthor(value.data.result));
  }

  // delete
  const handelDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.ADMIN.AUTHORS.VIEW(id)}`)
      .then((response) => {
        if (response.data.result.status) {
          getAuthors();
        }
      })
  }
  useEffect(() => {
    getAuthors();
  }, [])
  
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
            {
              Author && Author.length > 0 ? (
                Author.map((author, index) => (
                  <tr key={author.id}>
                    <td valign='middle'>{index + 1}</td>
                    <td valign='middle'>
                      <img className='user-img' src={`${import.meta.env.VITE_SERVER_MAIN_URL}/author/${author?.profile_img}`} alt={author?.name} />
                    </td>
                    <td valign='middle'>{author?.name}</td>
                    <td valign='middle'>{author?.email}</td>
                    <td valign='middle'>
                      {author?.bio}
                    </td>
                    <td valign='middle'>{`${author?.status.charAt(0).toUpperCase()}${author?.status.slice(1)} `}</td>
                    <td valign='middle'>
                      <div className='d-flex gap-2 item-actions'>
                        <Link className='act edit' to={`${AppRoute.ADMIN.AUTHORS.VIEW(author?.id)}`}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>

                        <span role='button' onClick={() => setDeleteAuthorId(author.id)} className='act delete' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          <FontAwesomeIcon icon={faTrashCan} />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td className='py-5 no-records' align='center' colSpan={'7'}>No records found</td></tr>
              )
            }


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
                <button type="button" className="btn btn-primary"
                  onClick={() => {
                    handelDelete(DeleteAuthorID);
                    setDeleteAuthorId(null);
                  }}
                  data-bs-dismiss="modal"
                >
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
