import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AppRoute from "@/routes/routes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faChartLine, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify';
const All_Books = () => {
    const [book, setBook] = useState([]);
    const [bookID, setBookID] = useState(null);
    const { user_id, subscription_type } = useSelector((state) => state.authors.user)
    const GetBooks = async () => {
        
        try {
            await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.AUTHOR.BOOK.LIST}`, {
                params: { user_id }
            }).then((value) => setBook(value.data.books))
        } catch (err) {
            console.log(err)
        }
    }
    const handleDeleteBook = async () => {
        try {

            let respnse = await axios.delete(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.AUTHOR.BOOK.SINGLE(bookID)}`, {
                params: {
                    userID: user_id,
                }
            })
            if (respnse.data.status) {
                toast.success(respnse.data.message);
                GetBooks();
                
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        GetBooks();
    }, [user_id])

    return (
        <div className='p-4 bg-white rounded-2'>
            <>
                <div className='d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom'>
                    <h4 className='section-title m-0'>My Books</h4>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: "40px" }}>No</th>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th className='text-center'>Publication Date</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Quntity</th>
                            <th className='text-center'>Ratings</th>
                            <th className='text-center'>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            book.length && book.length > 0 ? (
                                book.map((book, index) => (
                                    <tr key={book.id}>
                                        <td valign='middle'>{index + 1}</td>
                                        <td valign='middle'>
                                            <img className='book-thumbnail' src={`${import.meta.env.VITE_SERVER_MAIN_URL}/book/${book.thumbnail}`} alt="Book Thumbnail" />
                                        </td>
                                        <td valign='middle'>{book.name}</td>
                                        <td valign='middle' align='center'>
                                            {new Date(book.publication_date).toISOString().split('T')[0]}
                                        </td>
                                        <td valign='middle' align='center'>${book.price}</td>
                                        <td valign='middle' align='center'>{book.quantity}</td>
                                        <td valign='middle' align='center'>{book.rating_value ? book.rating_value : "N/A"}</td>
                                        <td valign='middle' align='center' style={{ textTransform: "capitalize" }}>{book.status}</td>
                                        <td valign='middle'>
                                            <div className='d-flex gap-2 item-actions'>

                                                {
                                                    subscription_type == 'premium' && (

                                                        <Link className='act analytics' to={`${AppRoute.AUTHOR.BOOK.ANALYTICS(user_id)}`}>
                                                            <FontAwesomeIcon icon={faChartLine} /> Analytics
                                                        </Link>
                                                    )
                                                }
                                                <Link className='act edit' to={AppRoute.AUTHOR.BOOK.SINGLE(book.id)}>
                                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                                </Link>
                                                <span onClick={() => setBookID(book.id)} role='button' className='act delete' data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan={9} className='text-center py-4'>No record</td>
                                </tr>
                            )
                        }

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
                                <button data-bs-dismiss='modal' onClick={handleDeleteBook} type="button" className="btn btn-danger">
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

export default All_Books;
