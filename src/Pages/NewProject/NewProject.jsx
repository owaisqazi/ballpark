import React from "react";
import { Link } from "react-router-dom";

const NewProject = () => {
  return (
    <>
      <div className="container">
        <Link
          type="button"
          className="btn btn-white d-flex align-items-center pt-4"
          to={"/"}
        >
          <i className="fa fa-angle-left" style={{ fontSize: "25px" }}></i>
          &nbsp; <span>Back</span>
        </Link>
      </div>
      <div
        className="project-page d-flex flex-column align-items-center justify-content-center rounded-4"
        style={{ height: "54vh" }}
      >
        <div className="row">
          <h3 className="text-primary fw-bold text-capitalize mb-4 text-center mt-2 mt-md-0 pt-md-5 pt-0">
            New Project
          </h3>
          <div className="col-lg-3 text-center mt-md-2 mt-4">
            <Link to={"/cost-drawing"}>
              <button
                className={`btn breadcrumb_btn1 text-capitalize fw-bold`}
                style={{
                  padding: "10px 15px",
                  fontSize: "18px",
                  borderRadius: "25px",
                  letterSpacing: "0.5px",
                  transition: "0.5s",
                }}
                type="button"
              >
                Cost a Drawing
              </button>
            </Link>
          </div>
          <div className="col-lg-3 text-center mt-md-2 mt-4">
            <Link to={"/project-drawing"}>
              <button
                className={`btn breadcrumb_btn1 text-capitalize fw-bold`}
                style={{
                  padding: "10px 15px",
                  fontSize: "18px",
                  borderRadius: "25px",
                  letterSpacing: "0.5px",
                  transition: "0.5s",
                }}
                type="button"
              >
                Project Drawing
              </button>
            </Link>
          </div>
          <div className="col-lg-3 text-center mt-md-2 mt-4">
            <Link to={"/start-quote"}>
              <button
                className={`btn breadcrumb_btn1 text-capitalize fw-bold`}
                style={{
                  padding: "10px 15px",
                  fontSize: "18px",
                  borderRadius: "25px",
                  letterSpacing: "0.5px",
                  transition: "0.5s",
                }}
                type="button"
              >
                Start a Quote
              </button>
            </Link>
          </div>
          <div className="col-lg-3 text-center mt-md-2 mt-4">
            <Link to={"/off-the-shelf"}>
              <button
                className={`btn breadcrumb_btn1 text-capitalize fw-bold`}
                style={{
                  padding: "10px 15px",
                  fontSize: "18px",
                  borderRadius: "25px",
                  letterSpacing: "0.5px",
                  transition: "0.5s",
                }}
                type="button"
              >
                Off The Shelf
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProject;
