import React from "react";
// import { FaChalkboardUser } from "react-icons/fa6";
// import { FaChartLine } from "react-icons/fa6";
// import { Link } from 'react-router-dom';

const Feature = () => {
  return (
    <>
      {/* Start Feature Area */}
      <div className="feature-area fix area-padding">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div
              className="col-xl-6 col-lg-6 col-md-12"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <div className="feature-content">
                <div className="feature-images">
                  <img
                    src="https://img.freepik.com/free-photo/architectural-blueprints_1359-490.jpg?t=st=1725892411~exp=1725896011~hmac=ddfe9bbca2e1c08e7139f6c4433c8cd5b3c039c9019cea958322a97a4195f469&w=740"
                    alt=""
                    className="first-img"
                  />
                  <img
                    src="/assets/img/feature/three.jpeg"
                    alt=""
                    className="over-img"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-6 col-md-12"
              data-aos="fade-left"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <div className="feature-all">
                <div className="left-headline">
                  {/* <p className="top-head">About us</p> */}
                  <h2>About us</h2>
                  <p className="m-0">
                    Did you start designing to spend hours crunching numbers?
                    Yeah, neither did we. Welcome to In The Ballpark, where we
                    believe your creativity should take centre stage while the
                    boring stuff handles itself. We’ve built a fun, easy-to-use
                    AI-powered platform that estimates costs for your drawings
                    and designs, making the tedious tasks a breeze.
                  </p>
                </div>
                {/* about single */}
                <div
                  className="support-services wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  {/* <Link className="support-images" to={"#"}>
                  {/* <i className="flaticon-073-speech" /> 
                  <FaChalkboardUser />
                </Link> */}
                  <p className="m-0">
                    Simply upload your project, and let our AI do the heavy
                    lifting. Curious about where those costs come from? We link
                    you directly to the sources, so you know exactly what you’re
                    getting—and if you need to tweak something, it’s pretty
                    straight forward.
                    <br />
                    <br />
                    Our quoting system not only saves your designs and their
                    cost breakdowns but also comes stocked with price and
                    material breakdowns common custom extras such as flats and
                    step-and-repeats, complete with their technical drawings.
                    Plus, when you join our community, you’ll unlock a treasure
                    trove of material costs, all neatly organised in our quoting
                    system with links on where to purchase.
                  </p>
                  {/* <div className="support-content"> */}
                  {/* <h4>Online Support</h4> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex align-items-center mt-5">
            <div className="col-xl-6 col-lg-6 col-md-12" data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine">
              <div className="feature-all">
                <div className="left-headline">
                  <p className="m-0">
                    For a step-by-step guide on making the most of it, just hop
                    over to our ‘Navigating The Ballpark’ tab. It’s all pretty
                    straightforward, and we’re here to help you every step of
                    the way
                    <br />
                    <br />
                    Why waste time on calculations when you could be creating?
                    Let us handle the details so you can focus on what you do
                    best.
                  </p>
                </div>
                {/* about single */}
                <div
                  className="support-services wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  {/* <Link className="support-images" to={"#"}>
                  {/* <i className="flaticon-073-speech" /> 
                  <FaChalkboardUser />
                </Link> */}
                  <p className="m-0">
                    We are so confident that you are going to love it we will
                    give you a months free trial period
                  </p>
                  {/* <div className="support-content"> */}
                  {/* <h4>Online Support</h4> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12" data-aos="fade-left"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine">
              <div className="feature-content">
                <div className="feature-images">
                  <img
                    src="/assets/img/feature/two.jpeg"
                    alt=""
                    className="first-img"
                  />
                  <img
                    src="/assets/img/feature/four.jpeg"
                    alt=""
                    className="over-img"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 mt-5" data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine">
              <div className="feature-content">
                <div className="feature-all">
                  <p>• By our calculations that solves quite a few problems…</p>
                  <p>• Boring tedious costing for budgets.</p>
                  <p>
                    • Being asked for a ‘quick’ ballpark cost for a large-scale
                    event.
                  </p>
                  <p>
                    • Quoting against 10 other companies and not getting the job
                    despite the budget taking you days to pull together.
                  </p>
                  <p>
                    • The designers falling out with production as their designs
                    are out of budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Feature Area */}
    </>
  );
};

export default Feature;
