import React from 'react'

const Add = () => {
    return (
        <>
            <div className='p-4 bg-white rounded-2 w-50'>

                <form id="author-form" method="post" autoComplete="off">
                    {/* Author Name */}
                    <div className="form-group mb-3">
                        <label htmlFor="authorName" className="form-label">
                            Author Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="authorName"
                            name="authorName"
                            placeholder="Enter Author Name"
                            required=""
                        />
                    </div>
                    {/* Email */}
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter Author Email"
                            required=""
                        />
                    </div>
                    {/* Biography */}
                    <div className="form-group mb-3">
                        <label htmlFor="bio" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="bio"
                            name="bio"
                            rows={4}
                            placeholder="Write a short biography"
                            required=""
                            defaultValue={""}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label for="formFile" class="form-label">Profile Image</label>
                        <input className="form-control" type="file" id="formFile" />
                    </div>

                    {/* Premium Author Status */}
                    <div className="form-group mb-3">
                        <label className="form-label">Premium Status</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="premiumStatus"
                                id="premiumYes"
                                defaultValue="yes"
                                required=""
                            />
                            <label className="form-check-label" htmlFor="premiumYes">
                                Yes (Premium Author)
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="premiumStatus"
                                id="premiumNo"
                                defaultValue="no"
                            />
                            <label className="form-check-label" htmlFor="premiumNo">
                                No (Non-Premium Author)
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">
                            <i className="fa-solid fa-check" /> Submit
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Add