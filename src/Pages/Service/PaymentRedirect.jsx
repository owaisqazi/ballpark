import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import BaseUrl from "../../Auth/BaseUrl";
import UserLoader from "../../Component/Loader/Loader";

const PaymentRedirect = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const queryParams = new URLSearchParams(location?.search);
  const sessionId = queryParams?.get("session_id");
  const isTrue = queryParams?.get("success") === "true"; // Simplified check for success
  const token = localStorage?.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (isTrue) {
        try {
          setIsLoading(true);
          const formdata = new FormData();
          formdata.append("session_id", sessionId);
          const config = {
            method: "POST",
            url: `${BaseUrl?.baseurl}save-booking`,
            data: formdata,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios(config);
          if (response?.status === 200) {
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
          }
        } catch (error) {
          Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "error",
            title:error?.response?.data?.message,
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
        } finally {
          setIsLoading(false);
        }
      } else {
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title:"Payment Failed",
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
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTrue, sessionId, token]);

  return (
    <div>
      {isLoading && <UserLoader />}
      <section className={`page-area2 ${isTrue ? "area-120" : "page-area21"} position-relative h-100`}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 justify-content-start align-items-center">
              <div className="breadcrumb-title text-center">
                <div className="white-headline">
                  <h2>
                    {isTrue ? "Saved" : "Failed"} <span className="sp-color">Booking</span>
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
                      {isTrue ? "Saved" : "Failed"} Booking
                    </li>
                    <br />
                    <Link to={"/"} className="breadcrumb-item active hd-btn anti-btn px-3" aria-current="page">
                      Back To Home
                    </Link>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="background-overlay20"></div>
      </section>
    </div>
  );
};

export default PaymentRedirect;
