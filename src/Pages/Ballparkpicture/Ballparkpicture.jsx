import React from "react";
import { Link } from "react-router-dom";
const Ballparkpicture = () => {
  return (
    <>
      <div className="container mt-4">
        <Link
          type="button"
          className="btn btn-white d-flex align-items-center"
          to={"/"}
        >
          <i className="fa fa-angle-left" style={{ fontSize: "25px" }}></i>
          &nbsp; <span>Back</span>
        </Link>
      </div>
      <div className="project-drawing d-flex flex-column align-items-center justify-content-center rounded-4 mt-4">
        <div className="row">
          <h3 className="text-primary fw-bold text-capitalize mt-5 pb-2 col-lg-12 text-center">
            Ballpark 2.0 picture
          </h3>
          <div className="container">
            <div className="bg-white rounded-3">
              <p className="text-center">Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ballparkpicture;
