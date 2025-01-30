import React, { useEffect, useState, useTransition } from 'react';
import { Link } from 'react-router-dom';
import AppRoute from "@/routes/routes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faChartLine, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { ContentLoader } from '@/components/Loader';
const All_Books = () => {
    const [book, setBooks] = useState([]);
    const [isPending, startTransition] = useTransition();

    const GetBooks = async () => {

        try {
            let response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.ADMIN.BOOKS.ALL_BOOKS}`)
            startTransition(() => {
                setBooks(response.data.books);
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetBooks();
    }, [])

    return (
        <div className='p-4 bg-white rounded-2'>
            <div className='d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom'>
                <h4 className='section-title m-0'>My Books</h4>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "40px" }}>No</th>
                        <th>Thumbnail</th>
                        <th>Book Title</th>
                        <th>Author name</th>
                        <th>Category</th>
                        <th className='text-center'>Publication Date</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Quntity</th>
                        <th className='text-center'>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {


                        isPending ? (
                            <>
                                <tr>
                                    <td colSpan={10}>
                                        <ContentLoader />
                                    </td>
                                </tr>
                            </>
                        ) : book.length && book.length > 0 ? (
                            book.map((book, index) => (
                                <tr key={book.id}>
                                    <td valign='middle'>{index + 1}</td>
                                    <td valign='middle'>
                                        <img className='book-thumbnail' src={`${import.meta.env.VITE_SERVER_MAIN_URL}/book/${book.thumbnail}`} alt="Book Thumbnail" />
                                    </td>
                                    <td valign='middle'>{book.name}</td>
                                    <td valign='middle'>{book.author_name}</td>
                                    <td valign='middle'>{book.category}</td>
                                    <td valign='middle' align='center'>
                                        {new Date(book.publication_date).toISOString().split('T')[0]}
                                    </td>
                                    <td valign='middle' align='center'>${book.price}</td>
                                    <td valign='middle' align='center'>{book.quantity}</td>
                                    <td valign='middle' align='center' style={{ textTransform: "capitalize" }}>{book.status}</td>
                                    <td valign='middle'>
                                        <div className='d-flex gap-2 item-actions'>
                                            <span role='button' className='act delete' data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                <FontAwesomeIcon icon={faTrashCan} /> Delete
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))

                        ) : (
                            <tr>
                                <td colSpan={9} className='text-center'>No records found</td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div >
    );
}

export default All_Books;
