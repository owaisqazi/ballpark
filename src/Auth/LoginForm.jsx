/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "../Component/Layout/Header/Form.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Font Awesome icons
import BaseUrl from "./BaseUrl";
// import Loader from "../Component/Loader/Loader";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const FormSchemaLogin = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const iniailValue = {
  name: "",
  company: "",
  age: "",
  email: "",
  password: "",
};
const iniailValueLogin = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [PageLoader, setPageLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const Navigate= useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: activeTab === "login" ? iniailValueLogin : iniailValue,
    validationSchema: activeTab === "login" ? FormSchemaLogin : FormSchema,
    onSubmit: (values) => {
      setLoading(true);
      setPageLoader(true)
      console.log(values, "FormSchema");
      const config = {
        method: "POST",
        url: `${BaseUrl.baseurl}${activeTab === "login" ? "login/" : "signup/"}`,
        data: values,
        headers: {
          Accept: "application/json",
        },
      };
      axios(config)
        .then(function (response) {
          setLoading(false);
          setPageLoader(false)
          const msg =response?.data?.message?.email?.map((e)=>e)
          console.log(response?.data, "response");
         // Handle the payload if it exists
    if (response?.data?.payload) {
      localStorage.setItem("user", JSON.stringify(response.data.payload));
    } else {
      console.error("Payload is undefined");
      localStorage.setItem("user", JSON.stringify(response.data));
    }
          if (activeTab === "login") {
            localStorage.setItem("token", response.data.token);
            
          }
          if (response.status) {
            // setShow(false);
            Swal.fire({
              showCloseButton: true,
              toast: true,
              icon: "success",
              title:msg?msg:response?.data?.message,
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
            if (activeTab === "login") {
              Navigate("/")
              window.location.reload()
            }
          }
          
        })
        .catch((error) => {
          setPageLoader(false)
          setLoading(false);
          console.log(error?.response?.data?.message, "eroors===>");
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
    },
  });
  return (
    <>
      {/* {PageLoader ? <Loader/>: ( */}
            <>
             <div className="container mainDiveLogin">
              <div className="col-lg-6 col-12">
                <div className="logodiv">
                <img src="./logo.PNG" alt="" style={{width:"50%"}}/> 
                <h2>
                  <Link
                    to="https://ballpark-gray.vercel.app"
                    className={`backlogin fs-6`}
                  
                  >
                  Back to home
                  </Link>
                  <br />
                In the ballpark
                </h2>
                </div>
              </div>
             <div className="col-lg-6 card1 col-12">
                <h2>{activeTab === "login" ? "Login" : "Signup"} Form</h2>
                <div className="login_register">
                  <Link
                    to="#"
                    className={`login ${
                      activeTab === "login" ? "login_active" : ""
                    }`}
                    onClick={() => handleTabChange("login")}
                  >
                    Login
                  </Link>
                  <Link
                    to="#"
                    className={`register ${
                      activeTab === "register" ? "login_active" : ""
                    }`}
                    onClick={() => handleTabChange("register")}
                  >
                    Signup
                  </Link>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                  {activeTab === "register" && (
                    <>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="First Name"
                        className="name mb-3"
                        name="name"
                        value={values?.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors?.name && (
                        <div className="text-danger">{errors?.name}</div>
                      )}
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Company Name"
                        className="name mb-3"
                        name="company"
                        value={values?.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors?.company && (
                        <div className="text-danger">{errors?.company}</div>
                      )}
                      <input
                        type="number"
                        autoComplete="off"
                        placeholder="Age"
                        className="name mb-3"
                        name="age"
                        value={values?.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors?.age && (
                        <div className="text-danger">{errors?.age}</div>
                      )}
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
                      <div className="position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          placeholder="Password"
                          className="pass w-100"
                          name="password"
                          value={values?.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span
                          style={{top:"30%"}}
                          className="position-absolute end-0 translate-middle-y me-3 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      {errors?.password && (
                        <div className="text-danger">{errors?.password}</div>
                      )}
                    </>
                  )}
                  {activeTab === "login" && (
                    <>
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
                      <div className="position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          placeholder="Password"
                          className="pass w-100"
                          name="password"
                          value={values?.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span
                          style={{top:"30%"}}
                          className="position-absolute end-0 translate-middle-y me-3 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      {errors?.password && (
                        <div className="text-danger">{errors?.password}</div>
                      )}
                      <Link to="#" className="fp">
                        Forgot password?
                      </Link>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary login_btn d-flex align-items-center justify-content-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Processing...
                      </>
                    ) : activeTab === "register" ? (
                      "Signup"
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              </div>
             </div>
            </>
      {/* )} */}
    </>
  );
};

export default LoginForm;
