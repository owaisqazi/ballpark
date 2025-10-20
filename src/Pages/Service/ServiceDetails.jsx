import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BaseUrl from "../../Auth/BaseUrl";
import UserLoader from "../../Component/Loader/Loader";

const ServiceDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [consultantList, setConsultantList] = useState([]);
  const token = localStorage.getItem("token");
  const Getservices = () => {
    setIsLoading(true);
    var config = {
      method: "get",
      url: `${BaseUrl.baseurl}service/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "Getting services details");
        setData(response?.data?.service);
        if (response?.data?.status === true) {
          setIsLoading(false);
          Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "success",
            title: response?.data?.message,
            animation: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title: error?.response?.data?.message,
          animation: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      });
  };

  // Getconsultant

  const Getconsultant = () => {
    setIsLoading(true)
    var config = {
      method: "get",
      url: `${BaseUrl.baseurl}service/${id}/consultant`,

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(
          response?.data?.consultants.map((e) => e.email),
          "Getting services consultant"
        );
        setConsultantList(response?.data?.consultants);
        if (response?.data?.status === true) {
          setIsLoading(false);
          Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "success",
            title: response?.data?.message,
            animation: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title: error?.response?.data?.message,
          animation: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      });
  };
  useEffect(() => {
    Getservices();
    Getconsultant();
    // eslint-disable-next-line
  }, []);

  return (
    <>
    {isLoading ? <UserLoader /> :null}
      {/* Start Breadcrumb Area */}
      <section className="page-area area-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 justify-content-start align-items-center">
              <div className="breadcrumb-title text-center">
                <div className="white-headline">
                  <h2>
                    Service <span className="sp-color">details</span>
                  </h2>
                </div>
              </div>
              <div className="breadcrumb-page">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb ">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Service Details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Area */}
      {/* End services Area */}
      <div className="single-services-page bg-color-xs area-padding">
        <div className="container">
          <div className="row">
            {/* <div className="col-xl-4 col-lg-4 col-md-4">
          <div className="page-head-left">
            strat single area
            <div className="single-page-head">
              <div className="left-menu">
                <ul>
                  <li className="active">
                    <Link to={"/service-detail"}>Products design
                    </Link>
                  </li>
                  <li>
                    <Link to={"/service-detail"}>Web application</Link>
                  </li>
                  <li>
                    <Link to={"/service-detail"}>Digital marketing</Link>
                  </li>
                  <li>
                    <Link to={"/service-detail"}>E-commerce</Link>
                  </li>
                  <li>
                    <Link to={"/service-detail"}>Mobile apps</Link>
                  </li>
                  <li>
                    <Link to={"/service-detail"}>Tech support</Link>
                  </li>
                </ul>
              </div>
            </div>
            strat single area
            <div className="single-page-head">
              <div className="download-btn">
              <Link to={""} className="down-btn">
                  Download brochure <i className="fa fa-file-pdf-o" />
                </Link>
              <Link to={""} className="down-btn apli">
                  Download application <i className="fa fa-file-word-o" />
                </Link>
              </div>
            </div>
            {/* strat single area */}
            {/* end single area */}
            {/* <div className="single-page-head">
              <div className="new-project">
                <div className="project-new">
                  <h4>Are you ready new project?</h4>
                  <Link className="hire-btn anti-btn" to="/contact">
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
            end single area
          </div>
        </div> */}
            {/* End left sidebar */}
            {/* Start service page */}
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="single-service-inner">
                    <div className="single-service">
                      {/* <div className="service-img">
                <img src="/assets/img/icon/p1.png" alt="" />
              </div> */}
                      <div className="service-content">
                        <h4>
                          <Link to={"#"}>{data.name}</Link>
                        </h4>
                        <p>{data.description}</p>
                        <p id="servicePrice">{data.price}</p>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Teams area start */}
                <div className="team-area area-padding-2">
                  <div className="container">
                    <div className="row">
                      {/* Single team member */}
                      {consultantList?.map((e) => (
                        <div className="col-xl-4 col-lg-4 col-sm-12">
                          <div className="team-member-inner">
                            <div className="single-member">
                              <div className="team-img">
                                <img src="/assets/img/team/t1.jpg" alt="" />
                              </div>
                              <div className="team-content">
                                <h4 className="fs-6">
                                  <Link to={""}>
                                    {e?.first_name} {e?.last_name}
                                  </Link>
                                </h4>
                                <p style={{ fontSize: "14px" }}>{e?.email}</p>
                                <br />
                                <p id="servicePrice">
                                  <Link
                                    to={`/service-Book/${e.id}`}
                                    id="submit"
                                    className="anti-btn quote-btn p-2"
                                  >
                                    Book Now
                                  </Link>
                                </p>
                                {/* <ul className="team-hover">
                  <li>
                  <Link to={""}>
                      <i className="fa fa-facebook" />
                    </Link>
                  </li>
                  <li>
                  <Link to={""}>
                      <i className="fa fa-twitter" />
                    </Link>
                  </li>
                  <li>
                  <Link to={""}>
                      <i className="fa fa-pinterest" />
                    </Link>
                  </li>
                </ul> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Teams area end */}
                {/* single-well start*/}
                {/* <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="single-well mar-well">
                <h2>Everyone knows the important of great product design</h2>
                <p>
                  When replacing a multi-lined selection of text, the generated
                  dummy text maintains the amount of lines. When replacing a
                  selection of text within a single line, the amount of words is
                  roughly being maintained. When the replaced text selection
                  consists fully of lower-cased or capital letters or begins
                  with a capital letter, that previous casing is maintained.
                  Furthermore, the presence or absence of a trailing punctuation
                  mark of a replaced text selection is being maintained.
                </p>
              </div>
            </div> */}
                {/* <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="single-page mar-well">
                <div className="page-img elec-page">
                  <img src="/assets/img/feature/ser1.jpg" alt="" />
                </div>
              </div>
            </div>
            End single page
          </div>
          end Row
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="single-well mar-well">
              <Link to={""}>
                  <h3>What kind of business you have could investment</h3>
                </Link>
                <p>
                  When replacing a multi-lined selection of text, the generated
                  dummy text maintains the amount of lines. When replacing a
                  selection of text within a single line, the amount of words is
                  roughly being maintained.When the replaced text selection
                  consists fully of lower-cased or capital letters or begins
                  with a capital letter, that previous casing is maintained.
                  Furthermore, the presence or absence of a trailing punctuation
                  mark of a replaced text selection is being maintained.
                </p>
              </div>
            </div>
            {/* End single page */}
                {/* </div>
          end Row
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div className="single-well mar-well">
                <h4>Risk assessment solution</h4>
                <p>
                  When replacing a multi-lined selection of text .text within a
                  single line, the amount of words is roughly being maintained.
                </p>
                <ul className="marker-list">
                  <li>Words is roughly being maintained</li>
                  <li>Letters or begins with a capital letter</li>
                  <li>Previous casing is maintained</li>
                  <li>Maintains the amount of lines</li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div className="single-page mar-well">
                <div className="page-img">
                  <img src="/assets/img/feature/b2.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="single-well mar-well last-content">
                <h3>AI install business management system</h3>
                <p className="last-content">
                  When replacing a multi-lined selection of text, the generated
                  dummy text maintains the amount of lines. When replacing a
                  selection of text within a single line, the amount of words is
                  roughly being maintained.When the replaced text selection
                  consists fully of lower-cased or capital letters or begins
                  with a capital letter, that previous casing is maintained.
                  Furthermore, the presence or absence of a trailing punctuation
                  mark of a replaced text selection is being maintained.
                </p>
              </div>
            </div>
          </div>
          end Row  */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End service details area */}
      {/* Start Quote Area */}
      <div className="quote-area area-padding ">
        <div className="container">
          <div className="row quote-center d-flex align-items-center">
            <div className="col-xl-5 col-lg-5 col-md-12">
              <div className="quote-image">
                <div className="sub-head">
                  <h4>Contact us for services</h4>
                  <div className="single-contact">
                    <Link to={""}>
                      <i className="fa fa-phone" />
                      <span>+44-0022-222</span>
                    </Link>
                    <Link to={""}>
                      <i className="fa fa-envelope" />
                      <span>info@gmail.com</span>
                    </Link>
                    <Link to={""}>
                      <i className="fa fa-map" />
                      <span>Road-7 old Street London, England</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-12">
              <div className="quote-all">
                <form
                  id="contactForm"
                  method="POST"
                  action="contact.php"
                  className="contact-form"
                >
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Name"
                        required=""
                        data-error="Please enter your name"
                      />
                      <div className="help-block with-errors" />
                      <input
                        type="email"
                        className="email form-control"
                        id="email"
                        placeholder="Email"
                        required=""
                        data-error="Please enter your email"
                      />
                      <div className="help-block with-errors" />
                      <input
                        type="text"
                        id="msg_subject"
                        className="form-control last-part"
                        placeholder="Subject"
                        required=""
                        data-error="Please enter your message subject"
                      />
                      <div className="help-block with-errors last-part" />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <textarea
                        id="message"
                        rows={7}
                        placeholder="Massage"
                        className="form-control"
                        required=""
                        data-error="Write your message"
                        defaultValue={""}
                      />
                      <div className="help-block with-errors" />
                      <button
                        type="submit"
                        id="submit"
                        className=" anti-btn quote-btn"
                      >
                        Submit
                      </button>
                      <div id="msgSubmit" className="h3 text-center hidden" />
                      <div className="clearfix" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Quote Area */}
    </>
  );
};

export default ServiceDetails;
