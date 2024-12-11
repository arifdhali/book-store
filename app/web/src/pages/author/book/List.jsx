import React from 'react';
import { Link } from 'react-router-dom';
import AppRoute from "../../../routes/routes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faChartLine } from '@fortawesome/free-solid-svg-icons';

const BookList = () => {
    return (
        <div className='p-4 bg-white rounded-2'>
            <>
                <div className='d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom'>
                    <h4 className='section-title m-0'>My Books</h4>
                    <div>
                        {/* <Link to={`${AppRoute.AUTHOR.BOOK.ADD}`} className="btn btn-primary">Add New Book</Link> */}
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: "40px" }}>No</th>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Publication Date</th>
                            <th>Price</th>                            
                            <th>Quntity</th>
                            <th>Ratings</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td valign='middle'>1</td>
                            <td valign='middle'>
                                <img className='book-thumbnail' src="https://example.com/book-thumbnail.jpg" alt="Book Thumbnail" />
                            </td>
                            <td valign='middle'>Book Title</td>
                            <td valign='middle'>2024-11-07</td>
                            <td valign='middle'>$19.99</td>
                            <td valign='middle'>120</td>
                            <td valign='middle'>4.5</td>
                            <td valign='middle'>Published</td>
                            <td valign='middle'>
                                <div className='d-flex gap-2 item-actions'>
                                    <Link className='act edit' to={AppRoute.AUTHOR.BOOK_EDTI}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </Link>
                                    <Link className='act analytics' to={`${AppRoute.AUTHOR.BOOK.ANALYTICS(11)}`}>
                                        <FontAwesomeIcon icon={faChartLine} /> Analytics
                                    </Link>
                                    <span role='button' className='act delete' data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div
                    className="modal fade"
                    id="deleteModal"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                    aria-labelledby="deleteModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Delete Book</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">Are you sure you want to delete this book?</div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

export default BookList;
