import React from "react";
import { Link } from "react-router-dom";

const Quote = () => {
  return (
    <>
      {/* Start Quote Area */}
      <div className="quote-area quote-area-2 quote-area-3">
        <div className="container">
          <div className="row quote-center d-flex align-items-center m-0"  data-aos="flip-up"
          data-aos-duration="3000"
          >
            <div className="col-xl-5 col-lg-5 col-md-12">
              <div className="quote-image">
                <div className="sub-head white-head">
                  <h4>Contact us</h4>
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
                    <br />
                    <br />
                    <span className="pt-4">
                      Get in contact with us if you’d like to be added to our
                      suppliers list, you spot a bug or if you have a list of
                      materials you think should be added!
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-12">
              <div className="quote-all">
                <form
                  id="contactForm"
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
                        type="button"
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

export default Quote;
