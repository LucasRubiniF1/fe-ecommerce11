import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SuccessAlert = ({ message, show }) => {
  return (
    show && (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        {message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    )
  );
};

export default SuccessAlert;
