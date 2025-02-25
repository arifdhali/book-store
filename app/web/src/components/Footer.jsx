import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
    return (
        <>
            <footer
                className="text-center text-lg-start"
                style={{ backgroundColor: "#199e79" }}
            >
                <div className="container d-flex justify-content-center py-5">
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-floating mx-2"
                        style={{ backgroundColor: "#54456b" }}
                    >
                        <FontAwesomeIcon icon={faFacebookF} />
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-floating mx-2"
                        style={{ backgroundColor: "#54456b" }}
                    >
                        <FontAwesomeIcon icon={faYoutube} />
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-floating mx-2"
                        style={{ backgroundColor: "#54456b" }}
                    >
                        <FontAwesomeIcon icon={faInstagram} />

                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-floating mx-2"
                        style={{ backgroundColor: "#54456b" }}
                    >
                        <FontAwesomeIcon icon={faTwitter} />

                    </button>
                </div>
                {/* Copyright */}
                <div
                    className="text-center text-white p-3"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    © 2020 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">
                        MDBootstrap.com
                    </a>
                </div>
            </footer>
        </>

    )
}

export default Footer
