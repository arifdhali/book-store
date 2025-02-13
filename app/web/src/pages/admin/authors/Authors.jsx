import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import AppRoute from "@/routes/routes"
import axios, { all } from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from "@/utils/ConfirmModal"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { format } from 'date-fns';

const Authors = () => {
  const [Author, setAuthor] = useState();
  const [MakeSelectAll, setMakeSelectAll] = useState(false);
  const [DeleteItems, setDeleteItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [ModalInfo, setModalInfo] = useState({
    type: "",
    api_url: "",
    id: "",
    page_target: {

    },
  })
  let limit = 8;
  const getAuthors = async (page = 0) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.ADMIN.AUTHORS.LIST}`, {
        params: {
          offset: page * limit,
          limit: limit,
          
        }
      });
      setAuthor(response.data.author);
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    }
  };
  const HandelingChecked = (e) => {
    let { checked, id } = e.target;
    let checkedID = Number(id.split("_")[1]);
    setDeleteItems((prev) => {
      if (checked) {
        return [...prev, checkedID];
      } else {
        return prev.filter((item) => item !== checkedID)
      }
    })
  }
  const HandelingAllSelect = (e) => {
    if (DeleteItems.length == Author.length) {
      setDeleteItems([])
      setMakeSelectAll(false)
    } else {
      let allID = Author.map((author) => author.id)
      setDeleteItems(allID)
      setMakeSelectAll(true)
    }
  }
  const HandleDeleteItems = async () => {
    try {

      let response = await axios.delete(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.ADMIN.AUTHORS.VIEW(null)}`, {
        data: {
          DeleteItems
        }
      })
      if (response.data.status) {
        toast.success(response.data.message)
        getAuthors(currentPage);
        setDeleteItems([])
      }
    } catch (error) {
      toast.error(response.data.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      status: 'active',
      search: ''
    },
    onSubmit: async (value) => {
      let search = value.search.replace(/\s+/g, '').trim().toLowerCase();
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.ADMIN.AUTHORS.LIST}`, {
        params: {
          search: search,
          status: value.status,
          limit: limit,
          offset: currentPage * limit,
        }
      })
      if (response.data.status) {
        setAuthor(response.data.author);
      }
    }
  });

  const makePaginations = (direction) => {
    if (direction === 'next') {
      setCurrentPage(next => next + 1)
    } else if (direction === 'prev' && currentPage >= 1) {
      setCurrentPage(prev => prev - 1)
    }

  }

  useEffect(() => {
    if (DeleteItems.length == Author?.length) {
      setMakeSelectAll(true)
    } else {
      setMakeSelectAll(false)
    }
    getAuthors(currentPage);
  }, [DeleteItems, currentPage])

  return (
    <div className='p-4 bg-white rounded-2'>
      <>
        <div className='row justify-content-between align-items-end pb-3 mb-4 border-bottom'>
          <div className='col-6 d-flex gap-4 align-items-center'>
            <h4 className='section-title m-0'>Author List</h4>
            <div>
              <button
                onClick={HandelingAllSelect}
                className='btn btn-primary'>
                {`Select All (${DeleteItems.length > 0 ? DeleteItems.length : 0})`}
              </button>
              {DeleteItems.length > 0 && <button className='btn btn-danger ms-2' onClick={HandleDeleteItems}>Delete {<FontAwesomeIcon className='ms-2' icon={faTrashCan} />}</button>}
            </div>
          </div>
          <div className=' col-6 d-flex align-items-end gap-5 justify-content-end'>
            <form onSubmit={formik.handleSubmit} className='d-flex align-items-center gap-4'>
              <div style={{ width: "160px" }}>
                <label htmlFor="">
                  Status
                </label>
                <select onChange={formik.handleChange} className='form-control' name="status" id="">
                  <option value={''}>All Authors</option>
                  <option value={'active'}>Active</option>
                  <option value={'inactive'}>Inactive</option>
                  <option value={'block'}>Block</option>
                </select>
              </div>
              <div >
                <label htmlFor="">
                  Search
                </label>
                <div className="search d-flex align-items-center">
                  <input
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control border-end-0 rounded-end-0"
                    placeholder="Search by name"
                    value={formik.values.search}
                    name='search'
                  />
                  <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </form>
            <Link to={`${AppRoute.ADMIN.AUTHORS.ADD}`} className="btn btn-primary align-content-center">Add Author</Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>profile</th>
              <th>name</th>
              <th>email</th>
              <th style={{ width: "450px" }}>Description</th>
              <th className='text-center' >Joining Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Author && Author.length > 0 ? (
                Author.map((author, index) => (
                  <tr key={author.id}>
                    <td valign='top'>
                      <div className='d-flex align-items-start gap-2'>
                        <div className="form-check m-0 " >
                          <input className="form-check-input" type="checkbox" role='button' onChange={HandelingChecked} checked={DeleteItems.includes(author.id) || MakeSelectAll} id={`flexCheckIndeterminate_${author.id}`} />
                        </div>
                        <img className='user-img' src={`${import.meta.env.VITE_SERVER_MAIN_URL}author/${author?.profile_img}`} alt={author?.name} />
                      </div>
                    </td>
                    <td valign='top'>{author?.name}</td>
                    <td valign='top'>{author?.email}</td>
                    <td valign='top'>{author?.bio}</td>
                    <td valign='top' align='center'>{format(new Date(author?.created_at), "dd-MM-yyyy")} </td>
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
                <tr><td className='no-records' align='center' colSpan={'7'}>No records found</td></tr>
              )
            }
          </tbody>
        </table>
        <ul className="pagination m-0 justify-content-end">
          <li className="page-item me-3" >
            <button type='button' disabled={currentPage == 0} className="btn btn-warning" onClick={() => makePaginations('prev')}>
              Previous
            </button>
          </li>
          <li className="page-item " >
            <button type='button' disabled={Author?.length < limit} onClick={() => makePaginations('next')} className="btn btn-primary">
              Next
            </button>
          </li>
        </ul>
      </>
      <ConfirmModal modal={ModalInfo} onSuccess={getAuthors} />

    </div >
  )
}

export default Authors
