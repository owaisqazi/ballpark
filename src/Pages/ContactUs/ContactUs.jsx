import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line
const ContactUs = () => {
  return (
    <>
      {/* Start Breadcrumb Area */}
      <section className="page-area area-120 position-relative">
        <div className="container main-Container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 justify-content-start align-items-center">
              <div className="breadcrumb-title text-center">
                <div className="white-headline">
                  <h2>
                    Contact <span className="sp-color">us</span>
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
                      Contact us
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="background-overlay20"></div>
      </section>
      {/* Start Quote Area */}
      <div className="contact-area bg-color-xs area-padding p-3">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4">
              <div className="contact-icon">
                <div className="single-icon">
                  <i className="fa fa-phone" />
                  <p>
                    Call : +44-0022-222
                    {/* <br />
                    <span>Monday-Friday (10am-18pm)</span> */}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4">
              <div className="contact-icon">
                <div className="single-icon">
                  <i className="fa fa-envelope-o" />
                  <p>
                    Email : info@revail3.com
                    {/* <br />
                    <span>Web: www.rockstheme.com</span> */}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4">
              <div className="contact-icon">
                <div className="single-icon">
                  <i className="fa fa-map-marker" />
                  <p>
                    Location : house-22, Road-3
                    <br />
                    <span>London, England</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    <br />
                    <br />
                    <span className='pt-4'>Get in contact with us if you’d like to be added to our suppliers list, you spot a bug or
                    if you have a list of materials you think should be added!</span>
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
      {/* End Breadcrumb Area */}
      {/* Start contact Area */}
      {/* <div className="contact-area bg-color-xs p-4 ">
        <div className="container">
          <div className="row contact-page">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="map-area h-100">
                <div
                  id="googleMap"
                  style={{
                    width: "100%",
                    height: 350,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    title="Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7242.469197100016!2d67.01182818902025!3d24.821649599549982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d946550d8cb%3A0x1ccba3b27a2a0f14!2sBoat%20Basin!5e0!3m2!1sen!2sus!4v1712248158033!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="contact-image-inner">
            <div className="contact-image">
              <img src="/assets/img/feature/contact.jpg" alt="" />
            </div>
            <img
              className="contact-over-img"
              src="/assets/img/feature/ab2.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
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
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <input
                  type="email"
                  className="email form-control"
                  id="email"
                  placeholder="Email"
                  required=""
                  data-error="Please enter your email"
                />
                <div className="help-block with-errors" />
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12">
                <input
                  type="text"
                  id="msg_subject"
                  className="form-control"
                  placeholder="Subject"
                  required=""
                  data-error="Please enter your message subject"
                />
                <div className="help-block with-errors" />
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12">
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
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12">
                <button
                  type="submit"
                  id="submit"
                  className="contact-btn anti-btn"
                >
                  Send Message
                </button>
                <div id="msgSubmit" className="h3 text-center hidden" />
                <div className="clearfix" />
              </div>
            </div>
          </form>
        </div>
      </div> */}
        {/* </div> */}
      {/* </div>  */}
      {/* End Contact Area */}
    </>
  );
};

export default ContactUs;
