import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from "./assets/image/404.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faHouseCrack } from '@fortawesome/free-solid-svg-icons';




const NotFound = () => (
  <div className="container p-0">
    <div className="row vh-100 justify-content-center">
      <div className="col-sm-12 text-center align-self-center">
        <div className="error position-relative">
          <img src={errorImage} alt="404 Error" className="img-fluid error-img" />
          <h2 className="mt-5  fw-normal fs-1">Oops! This Page is Not Found.</h2>
          <p className="fs-5 text-body-tertiary mb-2" >The requested page does not exist.</p>
          <Link to="/" className="btn btn-primary mt-4">
            <div className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faHouseCrack} />
              <p className="mb-0">Back to Home</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
