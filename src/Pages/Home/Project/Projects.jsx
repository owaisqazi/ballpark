import React from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <>
      {/* Start project Area */}
      <div className="project-area project-area-2 area-padding">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 m-0" data-aos="zoom-in">
              <div className="left-headline full-left">
                <p className="top-head">Projects</p>
                <h2>Our Projects</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-xl-4 col-lg-4 col-md-6 m-0"
              data-aos="zoom-in-up"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <div className="single-awesome-project">
                <div className="awesome-img">
                  <Link to={""}>
                    <img
                      src="https://img.freepik.com/free-photo/worker-drawing-blueprint_23-2147710946.jpg?t=st=1726137442~exp=1726141042~hmac=d335ad8daebc0f3d8a3179b4ae46e503cda8f609b18f7a96d75da297fd41aa45&w=740"
                      alt=""
                    />
                  </Link>
                  <div className="add-actions text-center">
                    <Link
                      className="venobox vbox-item"
                      data-gall="myGallery"
                      target="_blank"
                      href="https://img.freepik.com/free-photo/worker-drawing-blueprint_23-2147710946.jpg?t=st=1726137442~exp=1726141042~hmac=d335ad8daebc0f3d8a3179b4ae46e503cda8f609b18f7a96d75da297fd41aa45&w=740"
                    >
                      {/* <BsBoxArrowInUpRight  className="port-icon ti-zoom-in" /> */}
                      {/* <i className="port-icon ti-zoom-in" /> */}
                    </Link>
                  </div>
                </div>
                <div className="project-dec">
                  <Link to={""}>{/* <h4>Our-Services</h4> */}</Link>
                </div>
              </div>
            </div>
            {/* single-awesome-project start */}
            <div
              className="col-xl-4 col-lg-4 col-md-6 m-0"
              data-aos="zoom-in-up"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <div className="single-awesome-project">
                <div className="awesome-img">
                  <Link to={""}>
                    <img
                      src="https://img.freepik.com/free-photo/human-hand-using-cellphone-blueprint-workplace_23-2148203981.jpg?t=st=1726137545~exp=1726141145~hmac=45e54b53832c9559c41d7098912a75fa94f97bf4d2c52b764699d9163152e23c&w=740"
                      alt=""
                    />
                  </Link>
                  <div className="add-actions text-center">
                    <Link
                      className="venobox vbox-item"
                      data-gall="myGallery"
                      target="_blank"
                      href="https://img.freepik.com/free-photo/human-hand-using-cellphone-blueprint-workplace_23-2148203981.jpg?t=st=1726137545~exp=1726141145~hmac=45e54b53832c9559c41d7098912a75fa94f97bf4d2c52b764699d9163152e23c&w=740"
                    >
                      {/* <BsBoxArrowInUpRight  className="port-icon ti-zoom-in" /> */}
                      {/* <i className="port-icon ti-zoom-in" /> */}
                    </Link>
                  </div>
                </div>
                <div className="project-dec">
                  <Link to={""}>{/* <h4>Mobile apps</h4> */}</Link>
                </div>
              </div>
            </div>
            {/* single-awesome-project end */}
            <div
              className="col-xl-4 col-lg-4 col-md-6 m-0"
              data-aos="zoom-in-up"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <div className="single-awesome-project">
                <div className="awesome-img">
                  <Link to={""}>
                    <img
                      src="https://img.freepik.com/free-photo/top-view-architect-working-his-project_23-2148242917.jpg"
                      alt=""
                    />
                  </Link>
                  <div className="add-actions text-center">
                    <Link
                      className="venobox vbox-item"
                      data-gall="myGallery"
                      target="_blank"
                      href="https://img.freepik.com/free-photo/top-view-architect-working-his-project_23-2148242917.jpg"
                    >
                      {/* <BsBoxArrowInUpRight  className="port-icon ti-zoom-in" />{ */}
                      {/* /* <i className="port-icon ti-zoom-in" /> */}
                    </Link>
                  </div>
                </div>
                <div className="project-dec">
                  <Link to={""}>{/* <h4>Web development</h4> */}</Link>
                </div>
              </div>
            </div>
            {/* single-awesome-project end */}
            <div className="d-lg-none d-xl-none col-md-6 ">
              <div className="single-awesome-project">
                <div className="awesome-img">
                  <Link to={""}>
                    <img src="/assets/img/project/p4.jpg" alt="" />
                  </Link>
                  <div className="add-actions text-center">
                    <Link
                      className="venobox vbox-item"
                      data-gall="myGallery"
                      target="_blank"
                      href="/assets/img/project/p4.jpg"
                    >
                      {/* <BsBoxArrowInUpRight  className="port-icon ti-zoom-in" />{/* */}
                      {/* <i className="port-icon ti-zoom-in" /> */}
                    </Link>
                  </div>
                </div>
                <div className="project-dec">
                  <Link to={""}>{/* <h4>Software solution</h4> */}</Link>
                </div>
              </div>
            </div>
            {/* single-awesome-project end */}
          </div>
        </div>
      </div>
      {/* project area End */}
    </>
  );
};

export default Projects;
