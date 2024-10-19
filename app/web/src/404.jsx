import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found text-center position-absolute top-50 start-50 translate-middle">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="home-link btn btn-success">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
