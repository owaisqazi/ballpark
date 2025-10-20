import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line
const Ballpark = () => {
  return (
    <>
    {/* Start Breadcrumb Area */}
      <section className="page-area area-120 position-relative">
        <div className="container main-Container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 justify-content-start align-items-center pt-3">
              <div className="breadcrumb-title text-center">
                <div className="white-headline">
                  <h2>
                    About Ballpark <span className="sp-color">2.0</span>
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
                      In the Ballpark2.0
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="breadcrumb-page breadcrumb-page-res">
                <nav aria-label="breadcrumb" className="container">
                  <p className="text-center text-white fs-5">
                    This is where things get really interesting.
                    <br />
                    Have you ever been out for a walk, spotted something
                    inspiring, and thought, “I wonder how much it would cost to
                    make that?” or “Could I create something like that?”
                    <br />
                    Well, now you can. We’ve just launched our app, which lets
                    you snap a photo of any object, measures its size, and
                    attempts to identify the material.
                    <br />
                    It then finds the closest matches and connects you to the
                    materials you'll need to make it yourself.
                  </p>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="background-overlay20"></div>
      </section>
      {/* Start Quote Area */}
    </>
  );
};

export default Ballpark;
