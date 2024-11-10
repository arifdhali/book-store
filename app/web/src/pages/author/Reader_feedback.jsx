import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faReply, faEye } from '@fortawesome/free-solid-svg-icons';

const ReaderFeedback = () => {
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const feedbacks = [
        { id: 1, reader: 'John Doe', rating: 5, comment: 'Loved this book!', date: '2024-11-05' },
        { id: 2, reader: 'Jane Smith', rating: 4, comment: 'Great read, highly recommended.', date: '2024-10-20' },
        { id: 3, reader: 'Alex Brown', rating: 3, comment: 'Good, but could be improved in some areas.', date: '2024-09-15' },
    ];

    const handleViewFeedback = (feedback) => {
        setSelectedFeedback(feedback);
    };

    return (
        <div className="p-4 bg-white rounded-2">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
                <h4 className="section-title m-0">Reader Feedback</h4>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#filterModal">
                    Filter by Rating
                </button>
            </div>

            {/* Feedback Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "40px" }}>No</th>
                        <th>Reader</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback, index) => (
                        <tr key={feedback.id}>
                            <td>{index + 1}</td>
                            <td>{feedback.reader}</td>
                            <td>
                                {[...Array(feedback.rating)].map((_, i) => (
                                    <FontAwesomeIcon key={i} icon={faStar} className="text-warning" />
                                ))}
                            </td>
                            <td>{feedback.comment}</td>
                            <td>{feedback.date}</td>
                            <td>
                                <div className="item-actions d-flex gap-2">                                    
                                    <span role='button'
                                        className="act view"
                                        data-bs-toggle="modal"
                                        data-bs-target="#replyModal"
                                    >
                                        <FontAwesomeIcon icon={faReply} /> Reply
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* View Feedback Modal */}
            <div
                className="modal fade"
                id="viewFeedbackModal"
                tabIndex={-1}
                aria-labelledby="viewFeedbackModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewFeedbackModalLabel">View Feedback</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedFeedback && (
                                <>
                                    <p><strong>Reader:</strong> {selectedFeedback.reader}</p>
                                    <p><strong>Rating:</strong> {[...Array(selectedFeedback.rating)].map((_, i) => (
                                        <FontAwesomeIcon key={i} icon={faStar} className="text-warning" />
                                    ))}</p>
                                    <p><strong>Comment:</strong> {selectedFeedback.comment}</p>
                                    <p><strong>Date:</strong> {selectedFeedback.date}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reply to Feedback Modal */}
            <div
                className="modal fade"
                id="replyModal"
                tabIndex={-1}
                aria-labelledby="replyModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="replyModalLabel">Reply to Feedback</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="replyMessage" className="form-label">Your Reply</label>
                                    <textarea
                                        className="form-control"
                                        id="replyMessage"
                                        rows="4"
                                        placeholder="Write your reply here"
                                    ></textarea>
                                </div>
                                <button type="button" className="btn btn-primary">Send Reply</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter by Rating Modal */}
            <div
                className="modal fade"
                id="filterModal"
                tabIndex={-1}
                aria-labelledby="filterModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="filterModalLabel">Filter by Rating</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="ratingFilter" className="form-label">Select Rating</label>
                                    <select className="form-select" id="ratingFilter">
                                        <option value="all">All Ratings</option>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <button type="button" className="btn btn-primary">Apply Filter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReaderFeedback;
