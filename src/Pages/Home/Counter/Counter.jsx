import React from 'react'
import { Link } from 'react-router-dom'

const Counter = () => {
  return (
    <>
  {/* start Counter Area */}
  <div className="counter-area counter-area-2 counter-area-3 bg-dark-2">
    <div className="container">
      <div className="row counter-center">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-6 m-0" data-aos="flip-up"
            data-aos-easing="linear"
     data-aos-duration="1500">
              <div className="single-fun">
                <div className="fun-icon">
                  <i className="flaticon-067-curriculum hide-icon" />
                  <i className="flaticon-067-curriculum" />
                </div>
                <div className="fun_text">
                  <span className="counter">420</span>
                  <h5>Complete project</h5>
                </div>
              </div>
            </div>
            {/* fun_text  */}
            <div className="col-xl-3 col-lg-3 col-md-6" data-aos="flip-up"
            data-aos-easing="linear"
     data-aos-duration="1500">
              <div className="single-fun">
                <div className="fun-icon">
                  <i className="flaticon-039-target hide-icon" />
                  <i className="flaticon-039-target" />
                </div>
                <div className="fun_text">
                  <span className="counter">12</span>
                  <h5>Years of experience</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6" data-aos="flip-up"
            data-aos-easing="linear"
     data-aos-duration="1500">
              <div className="single-fun">
                <div className="fun-icon">
                  <i className="flaticon-117-user hide-icon" />
                  <i className="flaticon-117-user" />
                </div>
                <div className="fun_text">
                  <span className="counter">40</span>
                  <h5>World countries</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6" data-aos="flip-up"
            data-aos-easing="linear"
     data-aos-duration="1500">
              <div className="single-fun last-item">
                <div className="fun-icon">
                  <i className="flaticon-107-trophy hide-icon" />
                  <i className="flaticon-107-trophy" />
                </div>
                <div className="fun_text">
                  <span className="counter">40</span>
                  <h5>Awards won</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row brand-center">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="brand-content">
                <div className="brand-carousel owl-carousel">
                  <div className="single-brand-item">
                  <Link to={""}>
                      <img src="img/brand/1.png" alt="" />
                    </Link>
                  </div>
                  <div className="single-brand-item">
                  <Link to={""}>
                      <img src="img/brand/2.png" alt="" />
                    </Link>
                  </div>
                  <div className="single-brand-item">
                  <Link to={""}>
                      <img src="img/brand/3.png" alt="" />
                    </Link>
                  </div>
                  <div className="single-brand-item">
                  <Link to={""}>
                      <img src="img/brand/4.png" alt="" />
                    </Link>
                  </div>
                  <div className="single-brand-item">
                  <Link to={""}>
                      <img src="img/brand/5.png" alt="" />
                    </Link>
                  </div>
                  <div className="single-brand-item">
                  <Link to={""}>
                      <img src="img/brand/6.png" alt="" />
                    </Link>
                  </div>
                  <div className="single-brand-item">
                  <Link to={""}>
                      <img src="img/brand/7.png" alt="" />
                    </Link>
                  </div>
                  <div className="single-brand-item">
                  <Link to={""}>
                      <img src="img/brand/8.png" alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Counter Area */}
</>

  )
}

export default Counter