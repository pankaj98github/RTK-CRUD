import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
