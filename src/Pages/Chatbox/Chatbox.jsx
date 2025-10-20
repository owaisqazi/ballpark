import React, { useEffect, useState } from "react";
import "../../Chat.css";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import UserLoader from '../../Component/Loader/Loader';
import BaseUrl from "../../Auth/BaseUrl";
const Chatbox = () => {
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const GetConsultant = () => {
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
        setData(response?.data?.consultant);
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
  const ChatMessage = () => {
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
        setData(response?.data?.consultant);
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
  useEffect(() => {
    GetConsultant();
    ChatMessage();
    // eslint-disable-next-line
  }, []);

  console.log(data, "data==>");
  return (
    <>
      {isLoading ? <UserLoader /> :null}
      <div className="container">
        <div className="main-container">
          <div className="left-container">
            {/*header */}
            <div className="header">
              <div className="user-img">
                <img
                  className="dp"
                  src="https://www.codewithfaraz.com/InstaPic.png"
                  alt=""
                />
              </div>
              {/* <div className="nav-icons">
          <li>
            <i className="fa-solid fa-users" />
          </li>
          <li>
            <i className="fa-solid fa-message"></i>
          </li>
          <li>
            <i className="fa-solid fa-ellipsis-vertical" />
          </li>
        </div> */}
            </div>
            <div className="search-container">
              <div className="input">
                <i className="fa-solid fa-magnifying-glass" />
                <input type="text" placeholder="Search or start new chat   " />
              </div>
              <i className="fa-sharp fa-solid fa-bars-filter" />
            </div>
            {/*chats */}
            <div className="chat-list">
              {/* {data?.map((e, index) => (
                <div className="chat-box" key={index}>
                  <div className="img-box">
                    <img
                      className="img-cover"
                      src="https://lh5.googleusercontent.com/-7ssjf_mDE1Q/AAAAAAAAAAI/AAAAAAAAASo/tioYx2oklWEHoo5nAEyCT-KeLxYqE5PuQCLcDEAE/s100-c-k-no-mo/photo.jpg"
                      alt=""
                    />
                  </div>
                  <div className="chat-details">
                    <div className="text-head" id="chatnamecss2">
                      <h4>{e.first_name + " " + e.last_name}</h4>
                    </div>
                    <div className="text-message">
                      <p>“How are you?”</p>
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
          <div className="right-container">
            {/*header */}
            <div className="header">
              <div className="img-text">
                <div className="user-img">
                  <img
                    className="dp"
                    src="https://images.pexels.com/photos/2474307/pexels-photo-2474307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                </div>
                <h4 id="chatnamecss2" className="fs-5">
                  Leo
                  <br />
                  <span>Online</span>
                </h4>
              </div>
              {/* <div className="nav-icons">
          <li>
            <i className="fa-solid fa-magnifying-glass" />
          </li>
          <li>
            <i className="fa-solid fa-ellipsis-vertical" />
          </li>
        </div> */}
            </div>
            {/*chat-container */}
            <div className="chat-container">
              <div className="message-box my-message">
                <p>
                  I've been waiting to see that show asap!
                  <br />
                  <span>07:43</span>
                </p>
              </div>
              <div className="message-box friend-message">
                <p>
                  Ahh, I can't believe you do too!
                  <br />
                  <span>07:45</span>
                </p>
              </div>
              <div className="message-box friend-message">
                <p>
                  The trailer looks good
                  <br />
                  <span>07:45</span>
                </p>
              </div>
              <div className="message-box friend-message">
                <p>
                  I've been waiting to watch it!!
                  <br />
                  <span>07:45</span>
                </p>
              </div>
              <div className="message-box my-message">
                <p>
                  😐😐😐
                  <br />
                  <span>07:46</span>
                </p>
              </div>
              <div className="message-box my-message">
                <p>
                  Mee too! 😊
                  <br />
                  <span>07:46</span>
                </p>
              </div>
              <div className="message-box friend-message">
                <p>
                  We should video chat to discuss, if you're up for it!
                  <br />
                  <span>07:48</span>
                </p>
              </div>
              <div className="message-box my-message">
                <p>
                  Sure
                  <br />
                  <span>07:48</span>
                </p>
              </div>
              <div className="message-box my-message">
                <p>
                  I'm free now!
                  <br />
                  <span>07:48</span>
                </p>
              </div>
              <div className="message-box friend-message">
                <p>
                  Awesome! I'll start a video chat with you in a few.
                  <br />
                  <span>07:49</span>
                </p>
              </div>
            </div>
            {/*input-bottom */}
            <div className="chatbox-input">
              <input type="text" placeholder="Type a message" />
              <i className="fa-solid fa-microphone" />
            </div>
          </div>
          {/* <!-- Icon overlay --> */}
          <Link to={"/"} class="icon-overlay">
            <i class="fa-solid fa-home" style={{ color: "#fff703" }}></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
