import React from 'react';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
const ContentLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};


export {
  Loader,
  ContentLoader
}
