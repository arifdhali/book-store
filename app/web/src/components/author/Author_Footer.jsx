import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className='m-4'>
                <p>Copyrights @Arif Dhali</p>
            </footer>
            <div
                className="modal fade"
                id="LogoutAuthor"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="LogoutAuthorLabel"
                aria-hidden="true"

            >
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="LogoutAuthorLabel">
                                Confirmations
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"

                            />
                        </div>
                        <div className="modal-body">Are you sure you want to logout?</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Footer
