import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "../../Component/Layout/Header/Form.css";
import { DatePicker, Form } from "antd";
import Swal from "sweetalert2";
import BaseUrl from "../../Auth/BaseUrl";
import UserLoader from "../../Component/Loader/Loader";
import SelectCurrency from "./SelectCurrency";
import Select from "./Select";

const FormSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  contact: Yup.number().required("contact is required"),
  country: Yup.string().required("country is required"),
  currency: Yup.string().required("currency is required"),
});

const ServiceBook = () => {
  const { id } = useParams();
  const [dateRange, setDateRange] = useState();
  const [newids, setNewIds] = useState({ slotId: "", calendarId: ""});
  const iniailValue = {
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    country: "",
    currency: "",
    successUrl: `${BaseUrl.baseurlFront}payment-redirect?success=true`,
    cancelUrl: `${BaseUrl.baseurlFront}payment-redirect?success=false`,
  };
  console.log(dateRange?.consultant?.service_id, "data====>");
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: iniailValue,
    validationSchema: FormSchema,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        serviceId: dateRange?.consultant?.service_id,
        ...newids,
      };
      console.log(newValues);
      // Move handleSlotClick function outside of onSubmit
      handleSlotClick(newValues);
    },
  });

  // Define handleSlotClick function outside of onSubmit
  const handleSlotClick = (values) => {
    console.log("Selected slot time:", values);
    setIsLoading(true);
    const config = {
      method: "POST",
      url: `${BaseUrl.baseurl}stripe-checkout`,
      data: values,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response,'checkout====>')
          if(response.data.checkout_url){
            window.location.href = response.data.checkout_url;
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

            
          }else{
            handleClose()
            setIsLoading(false);
             Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "success",
            title: response?.data?.message,
            animation: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          }
        }
        // window.location.reload();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error?.response?.data?.message, "eroors===>");
        setIsLoading(false);
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
        // setShow(false); // Handle error response
      });
  };

  // Rest of your component code...

  const Getconsultant = (startDate, endDate) => {
    setIsLoading(true);
    var config = {
      method: "get",
      url: `${BaseUrl.baseurl}consultant/${id}/calendar?from=${startDate}&to=${endDate}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setDateRange(response?.data);
        console.log(response?.data, "Getting services consultant");
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
  // {console.log(dateRange.calendar.map((e)=>e?.available_slots.map((e)=>e.consultation_slot_time)), "dateRange")}

  console.log(dateRange?.consultant, "consultant");

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      {isLoading && <UserLoader />}
      {/* Start Breadcrumb Area */}
      <section className="page-area area-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 justify-content-start align-items-center">
              <div className="breadcrumb-title text-center">
                <div className="white-headline">
                  <h2>
                    Service <span className="sp-color">Book</span>
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
                      Service Book
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
            {/* Start service page */}
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="single-service-inner">
                    <div className="single-service">
                      <Form.Item label="Start Date - End Date" colon={false}>
                        <DatePicker.RangePicker
                          format="MMM Do, YYYY"
                          // value={dateRange}
                          separator={"-"}
                          onChange={(x) => {
                            console.log(
                              x,
                              x[0].format("YYYY-MM-DD"),
                              x[1].format("YYYY-MM-DD")
                            );
                            Getconsultant(
                              x[0].format("YYYY-MM-DD"),
                              x[1].format("YYYY-MM-DD")
                            );
                          }}
                          allowClear={false}
                        />
                      </Form.Item>
                      <div>
                        {dateRange?.calendar.map((date) => (
                          <div className="row" key={date.date}>
                            {date.available_slots.map((slot) => (
                              <div
                                className="col-lg-3 col-sm-12 text-center"
                                key={slot.consultation_slot_time}
                              >
                                <p id="servicePrice">
                                  <div
                                    id="submit"
                                    className="anti-btn quote-btn p-2 my-2"
                                    onClick={() => {
                                      setNewIds({
                                        ...newids,
                                        slotId: slot.id,
                                        calendarId: slot.calendar_id,
                                      });
                                      handleShow();
                                    }}
                                  >
                                    {slot.consultation_slot_time}
                                  </div>
                                </p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
                <form id="contactForm" className="contact-form">
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="roundedcircle20">
          <>
            {/* FORMULAIRE DE CONNEXION */}
            <Modal.Header closeButton className="border-0"></Modal.Header>
            <div className="card">
              <h2>Detail Form</h2>
              <form className="form" onSubmit={handleSubmit}>
                <>
                  <div className="row">
                    <div className="col-lg-6">
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="First Name"
                        className="first_name mb-3"
                        name="firstname"
                        value={values?.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors?.firstname && (
                        <div className="text-danger">{errors?.firstname}</div>
                      )}
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Last Name"
                        className="lastname mb-3"
                        name="lastname"
                        value={values?.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors?.lastname && (
                        <div className="text-danger">{errors?.lastname}</div>
                      )}
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="email"
                        autoComplete="off"
                        placeholder="Email Address"
                        className="email"
                        name="email"
                        value={values?.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors?.email && (
                        <div className="text-danger">{errors?.email}</div>
                      )}
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="number"
                        autoComplete="off"
                        placeholder="contact"
                        className="pass"
                        name="contact"
                        value={values?.contact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors?.contact && (
                        <div className="text-danger">{errors?.contact}</div>
                      )}
                    </div>
                    <div className="col-lg-6">
                    <Select 
                      country={values?.country}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="currency"
                      />

                      {/* <input
                        type="text"
                        autoComplete="off"
                        placeholder="country"
                        className="pass"
                        name="country"
                        value={values?.country}
                        onChange={handleChange}
                        
                      /> */}
                      {errors?.country && (
                        <div className="text-danger">{errors?.country}</div>
                      )}
                    </div>
                    <div className="col-lg-6">
                      <SelectCurrency
                        currency={values?.currency}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        name="currency"
                      />
                      {errors?.currency && (
                        <div className="text-danger">{errors?.currency}</div>
                      )}
                    </div>
                    <div className="col-lg-12 mt-3">
                    <input
                      type="password"
                      autoComplete="off"
                      placeholder="Password"
                      className="pass col-lg-12 w-100"
                      name="password"
                      value={values?.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors?.password && (
                      <div className="text-danger">{errors?.password}</div>
                    )}
                  </div>
                  </div>
                </>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="login_btn"
                >
                  Save
                </button>
              </form>
            </div>
          </>
        </Modal.Body>
      </Modal>
      {/* End Quote Area */}
    </>
  );
};

export default ServiceBook;
