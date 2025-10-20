import React from "react";
import { Link } from "react-router-dom";
// import UserLoader from "../../Component/Loader/Loader";
import "./service.css";

const Service = () => {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // console.log(data, "Getting services");
  return (
    <>
      {/* {isLoading ? <UserLoader /> : null} */}
      {/* Start Breadcrumb Area */}
      <section className="page-area area-120 position-relative">
        <div className="container main-Container">
          <div className="row h-100">
            {/* Left Section */}
            <Link
              to={"/new-project"}
              className="col-lg-6 d-flex flex-column align-items-center justify-content-center bg-white stylish-box"
            >
              <i className="fas fa-project-diagram mb-2 stylish-icon"></i>
              <h3 className="stylish-text">New Project</h3>
            </Link>

            {/* Right Section */}
            <div className="col-lg-6 d-flex flex-wrap">
              <Link
                to={"/post-project"}
                className="col-6 d-flex flex-column align-items-center justify-content-center stylish-box"
              >
                <i className="fas fa-history mb-2 stylish-icon"></i>
                <h3 className="stylish-text">Past Project</h3>
              </Link>
              <Link
                to={"/profile"}
                className="col-6 d-flex flex-column align-items-center justify-content-center stylish-box"
              >
                <i className="fas fa-user-circle mb-2 stylish-icon"></i>
                <h3 className="stylish-text">My Profile</h3>
              </Link>
              <Link
                to={"/Ballpark-picture"}
                className="col-6 d-flex flex-column align-items-center justify-content-center stylish-box"
              >
                <i className="fas fa-lightbulb mb-2 stylish-icon"></i>
                <h3 className="stylish-text">Ballpark 2.0</h3>
              </Link>
              <Link
                to={"/off-the-shelf"}
                className="col-6 d-flex flex-column align-items-center justify-content-center stylish-box"
              >
                <i className="fas fa-clipboard-list mb-2 stylish-icon"></i>
                <h3 className="stylish-text">Materials List</h3>
              </Link>
            </div>
          </div>
        </div>

        <div class="background-overlay20"></div>
      </section>
      {/* <section className="page-area area-120 position-relative">
        <div className="container main-Container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="breadcrumb-title text-center">
                <div className="white-headline">
                  <h2 className="mb-0">
                    Welcome <span className="sp-color">Into the Ballpark</span>
                  </h2>
                </div>
              </div>
              <div className="breadcrumb-page breadcrumb-Section">
                <nav aria-label="breadcrumb">
                  <div className="col-lg-12 mt-3" style={{borderRadius:"30px"}}>
                    <Link to={"/profile"}>
                      <button
                        type="button"
                        id="submit"
                        className="anti-btn quote-btn sm-w-100 breadcrumb_btn1"
                      >
                        My Profile
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-12 mt-3" style={{borderRadius:"30px"}}>
                    <Link to={"/new-project"}>
                      <button
                        type="button"
                        id="submit"
                        className="anti-btn quote-btn sm-w-100 breadcrumb_btn1"
                      >
                        New Project
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-12 mt-3" style={{borderRadius:"30px"}}>
                    <Link to={"/post-project"}>
                      <button
                        type="button"
                        id="submit"
                        className="anti-btn quote-btn sm-w-100 breadcrumb_btn1"
                      >
                        Past Project
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-12 mt-3" style={{borderRadius:"30px"}}>
                    <Link to={"/off-the-shelf"}>
                      <button
                        type="button"
                        id="submit"
                        className="anti-btn quote-btn sm-w-100 breadcrumb_btn1"
                      >
                       Off The Shelf
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-12 mt-3" style={{borderRadius:"30px"}}>
                    <Link to={"/Ballpark-picture"}>
                      <button
                        type="button"
                        id="submit"
                        className="anti-btn quote-btn sm-w-100 breadcrumb_btn1"
                      >
                        Ballpark 2.0 Pictures
                      </button>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="background-overlay20"></div>
      </section> */}
      {/* End Breadcrumb Area */}
    </>
  );
};

export default Service;
