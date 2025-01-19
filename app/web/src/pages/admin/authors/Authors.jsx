import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppRoute from "@/routes/routes"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBell, faTrashCan, faIcons, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from "@/utils/ConfirmModal"

const Authors = () => {
  const [Author, setAuthor] = useState();
  const [ModalInfo, setModalInfo] = useState({
    type: "",
    api_url: "",
    id: "",
    page_target: {

    },
  })
  const getAuthors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.ADMIN.AUTHORS.LIST}`);
      setAuthor(response.data.result);
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    }
  };


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
                    <td valign='top'>{index + 1}</td>
                    <td valign='top'>
                      <img className='user-img' src={`${import.meta.env.VITE_SERVER_MAIN_URL}author/${author?.profile_img}`} alt={author?.name} />
                    </td>
                    <td valign='top'>{author?.name}</td>
                    <td valign='top'>{author?.email}</td>
                    <td valign='top'>
                      {author?.bio}
                    </td>
                    <td valign='top'>{`${author?.status.charAt(0).toUpperCase()}${author?.status.slice(1)} `}</td>
                    <td valign='top'>
                      <div className='d-flex gap-2 item-actions'>
                        <Link className='act edit' to={`${AppRoute.ADMIN.AUTHORS.VIEW(author?.id)}`}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>

                        <span role='button' onClick={() => setModalInfo({
                          type: 'delete',
                          api_url: AppRoute.ADMIN.AUTHORS.VIEW(author?.id)
                        })} className='act delete' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
      </>
      <ConfirmModal modal={ModalInfo} onSuccess={getAuthors} />

    </div>
  )
}

export default Authors
