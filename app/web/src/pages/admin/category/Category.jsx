import React from 'react'
import { Link } from 'react-router-dom'
import AppRoute from "../../../routes/routes"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';



const Category = () => {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom'>
                <h4 className='section-title m-0'>
                    Category Lists
                </h4>
                <div>
                    <Link to={`${AppRoute.ADMIN.CATEGORY.ADD}`} className="btn btn-primary align-content-center">Add Category</Link>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>no</th>
                        <th style={{ width: "20%" }}>name</th>
                        <th style={{ width: "40%" }}>Description</th>
                        <th className='text-center' style={{ width: "15%" }}>No of Book</th>
                        <th style={{ width: "15%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td valign='middle'>1</td>

                        <td valign='middle'>Jhone Steben</td>
                        <td valign='middle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque.
                            Etiam feugiat luctus est, vel commodo odio rhoncus sit amet. </td>
                        <td valign='middle' align='center'>10</td>
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
    )
}

export default Category