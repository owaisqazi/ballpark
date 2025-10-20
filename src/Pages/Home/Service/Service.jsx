import React from 'react'
import { Link } from 'react-router-dom'

const Service = () => {
  return (
    <>
  {/* Service area start */}
  <div className="service-area service-area-2 area-padding-2 bg-dark-1">
    <div className="container">
      <div className="row">
        <div className="col-xl-8 col-lg-8 col-md-6">
          <div className="text-inner">
            <div className="text-service white-headline">
              <p className="top-head">Best services</p>
              <h2>Provide our best services</h2>
              <p>
                Dummy text is also used to demonstrate the appearance of
                different. consultants opt in to the projects .Dummy text is
                also used to demonstrate the appearance of different.
                consultants opt in to the projects
              </p>
            </div>
            <div className="service-more-btn">
              <Link className="anti-btn" to="/service">
                More Services{" "}
                <span>
                  <i className="ti-arrow-top-right" />
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* single-service end*/}
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="single-service-inner">
            <div className="single-service">
              <div className="service-img">
                <img src="img/icon/p1.png" alt="" />
              </div>
              <div className="service-content">
                <h4>
                <Link to={"/"}>Product Design</Link>
                </h4>
                <p>
                  Dummy text is also used to demonstrate the appearance of
                  different. consultants opt in to the projects. demonstrate the
                  appearance of different. consultants opt in to the projects
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* single-service end*/}
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="single-service-inner">
            <div className="single-service">
              <div className="service-img">
                <img src="img/icon/p2.png" alt="" />
              </div>
              <div className="service-content">
                <h4>
                <Link to={""}>Branding</Link>
                </h4>
                <p>
                  Dummy text is also used to demonstrate the appearance of
                  different. consultants opt in to the projects. demonstrate the
                  appearance of different. consultants opt in to the projects
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* single-service end*/}
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="single-service-inner">
            <div className="single-service">
              <div className="service-img">
                <img src="img/icon/p3.png" alt="" />
              </div>
              <div className="service-content">
                <h4>
                <Link to={""}>Digital Marketing</Link>
                </h4>
                <p>
                  Dummy text is also used to demonstrate the appearance of
                  different. consultants opt in to the projects. demonstrate the
                  appearance of different. consultants opt in to the projects
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* single-well end*/}
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="single-service-inner">
            <div className="single-service ">
              <div className="service-img">
                <img src="img/icon/p4.png" alt="" />
              </div>
              <div className="service-content">
                <h4>
                <Link to={""}>It Solutions</Link>
                </h4>
                <p>
                  Dummy text is also used to demonstrate the appearance of
                  different. consultants opt in to the projects. demonstrate the
                  appearance of different. consultants opt in to the projects
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* single-service end*/}
        <div className="d-lg-none d-xl-none col-md-6 ">
          <div className="single-service-inner">
            <div className="single-service ">
              <div className="service-img">
                <img src="img/icon/p7.png" alt="" />
              </div>
              <div className="service-content">
                <h4>
                <Link to={""}>Cyber Security</Link>
                </h4>
                <p>
                  Dummy text is also used to demonstrate the appearance of
                  different. consultants opt in to the projects. demonstrate the
                  appearance of different. consultants opt in to the projects
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* single-service end*/}
      </div>
    </div>
  </div>
  {/* Service area End */}
</>

  )
}

export default Service