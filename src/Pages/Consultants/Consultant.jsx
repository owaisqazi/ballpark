import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BaseUrl from "../../Auth/BaseUrl";
import { TiMessages } from "react-icons/ti";
import Modal from "react-bootstrap/Modal";
import UserLoader from "../../Component/Loader/Loader";
// import "../../Component/Layout/Header/Form.css"

const Consultant = () => {
  const [data, setData] = useState([]);
  const [Id, setId] = useState();
  const [GetData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [Name, setName] = useState({
    first_name:"",
    last_name:""
  });
  const [Inpudata, setInpudata] = useState("");
  const token = localStorage.getItem("token");
  const handleShow = (id, first_name, last_name) => {
  
    setIsLoading(true);
    var config = {
      method: "get",
      url: `${BaseUrl.baseurl}consultant/${id}/chat`,

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "Getting chat");
        setGetData(response?.data?.messages);
        setIsLoading(false);
        GetConsultant();
        setSmShow(true);
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "success",
          title: "successfully consultant list",
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
        setIsLoading(false);
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
  const handleClose = () => {
    setSmShow(false);
  };

  const GetConsultant = () => {
    setIsLoading(true);
    var config = {
      method: "get",
      url: `${BaseUrl.baseurl}consultants`,

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "Getting consultants");
        if (response?.status === 200) {
          setData(response?.data?.consultant);
          setIsLoading(false);
          Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "success",
            title: "successfully consultant",
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
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error, "error");
        setIsLoading(false);
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title: error.response.data.message,
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
    GetConsultant();
    // eslint-disable-next-line
  }, []);

  const PostMessage = () => {
    const message = { message: Inpudata };
    setIsLoading(true);
    var config = {
      method: "POST",
      url: `${BaseUrl.baseurl}consultant/${Id}/message`,
      data:message,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "Getting consultants");
        if (response?.status === 200) {
          handleShow(Id);
          setIsLoading(false);
          Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "success",
            title: "successfully consultant",
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
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error, "error");
        setIsLoading(false);
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title: error.response.data.message,
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
console.log(Name,'Name');
  return (
    <>
      {/* Start Breadcrumb Area */}
      {isLoading && <UserLoader />}
      <section className="page-area area-120 position-relative">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 justify-content-start align-items-center">
              <div className="breadcrumb-title text-center">
                <div className="white-headline">
                  <h2>
                    Our <span className="sp-color">Consultants</span>
                  </h2>
                </div>
              </div>
              <div className="breadcrumb-page">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb ">
                    <li className="breadcrumb-item">
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Consultants
                    </li>
                    {/* <br />
                    <h4 className="breadcrumb-item active" aria-current="page">
                  Welcome to Consultify — Your Gateway to Revolutionary Business
                  Consulting
                    </h4> */}
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="background-overlay20"></div>
      </section>
      {/* End Breadcrumb Area */}
      {/* End services Area */}
      <div className="single-services-page bg-color-xs">
        <div className="container">
          <div className="row">
            {/* Start service page */}
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="row">
                {/* Teams area start */}
                <div className="team-area py-5">
                  <h2 className="text-center ">Consultants List</h2>
                  <div className="container">
                    <div className="row">
                      {/* Single team member */}
                      {data?.map((e) => {
                        const FirstName = `${e?.first_name}&nbsp;${e?.last_name}`;

                        return (
                          <div
                            className="col-xl-4 col-lg-4 col-sm-12"
                            key={e.id}
                          >
                            <div className="team-member-inner">
                              <div className="single-member">
                                <div className="team-img">
                                  <img
                                    src="/assets/img/team/t1.jpg"
                                    alt=""
                                    style={{ width: "100px", height: "100%" }}
                                  />
                                </div>
                                <div className="team-content">
                                  <h4
                                    title={`${e?.first_name} ${e?.last_name}`}
                                    dangerouslySetInnerHTML={{
                                      __html: FirstName,
                                    }}
                                    className="fs-6 textH4H"
                                  />
                                  <p style={{ fontSize: "14px" }}>{e?.email}</p>
                                  <br />
                                  <p id="servicePrice">
                                    <Link
                                      // to={`/Chatbox/${e.id}`}
                                      id="submit"
                                      onClick={() => {
                                        handleShow(
                                          e.id,
                                        );
                                        setName(prevState => ({
                                          ...prevState, // Spread the previous state
                                          first_name: e?.first_name,
                                          last_name:e?.last_name
                                    
                                           // Update the vealue for key2
                                        }));
                                        setId(e.id);
                                      }}
                                      className="anti-btn quote-btn p-2"
                                    >
                                      <i
                                        style={{
                                          color: "black",
                                          fontSize: "20px",
                                        }}
                                      >
                                        <TiMessages />
                                      </i>
                                      &nbsp;Talk To
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End service details area */}
      <Modal
        size="lg"
        show={smShow}
        onHide={() => handleClose()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body>
          <>
            {/* FORMULAIRE DE CONNEXION */}
            <div className="container mt-5">
              <Modal.Header
                onClick={handleClose}
                closeButton
                className="border-0"
              ></Modal.Header>
              <div className="row">
                <div className="col-md-12">
                  <div className="card" id="chatCart">
                    <p className="modalHeader">
                      <div className="d-flex justify-content-start align-items-center me-auto border-buttom">
                        <img
                          src="https://via.placeholder.com/50"
                          style={{ width: "50px" }}
                          alt="Avatar"
                          className="rounded-circle me-3"
                        />
                        <div>
                          <p className="m-0 text-capitalize">{Name.first_name+ " " +Name.last_name}</p>
                        </div>
                      </div>
                    </p>
                    <div className="card-body w-100" id="message-list">
                      <ul className="list-unstyled">
                        {GetData.map((e) => (
                          <>
                            {e.sender === "customer" && (
                              <li className="mb-3 w-100">
                                <div className="d-flex justify-content-start align-items-center">
                                  <img
                                    src="https://via.placeholder.com/50"
                                    alt="Avatar"
                                    className="rounded-circle me-3"
                                    style={{ width: "50px" }}
                                  />
                                  <div className="col-lg-12">
                                    <p className="m-0 text-capitalize">
                                      {e?.message}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            )}
                            {e.sender === "consultant" && (
                              <li className="mb-3 w-100">
                                <div className="d-flex justify-content-end align-items-center">
                                  <div className="col-lg-12">
                                    <p
                                      className="m-0 text-capitalize"
                                      style={{
                                        width: "100%",
                                        textAlign: "end",
                                      }}
                                    >
                                      {e.message}
                                    </p>
                                  </div>
                                  <img
                                    src="https://via.placeholder.com/50"
                                    alt="Avatar"
                                    style={{ width: "50px" }}
                                    className="rounded-circle ms-3"
                                  />
                                </div>
                              </li>
                            )}
                          </>
                        ))}
                      </ul>
                    </div>
                    <div className="card-footer w-100">
                      <form>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setInpudata(e.target.value)}
                            placeholder="Type your message"
                            id="message-input"
                          />
                          <button
                            type="button"
                            onClick={PostMessage}
                            className="btn modalHeaderbtn text-white"
                          >
                            <img
                              width={20}
                              height={30}
                              src="./assets/send.png"
                              alt=""
                              className="object-fit-contain " // Adding margin to the left of the image for spacing
                            />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Consultant;
