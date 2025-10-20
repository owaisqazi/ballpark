import React from 'react'
import { GiTeamUpgrade } from "react-icons/gi";
import { MdOutlineWaterfallChart } from "react-icons/md";
import { Link } from 'react-router-dom';

const FeatureServices = () => {
  return (
    <>
    {/* Start Feature Area */}
    <div className="feature-area feature-area-2 fix area-padding-1">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="feature-all">
              <div className="left-headline">
                <p className="top-head">Featuers</p>
                <h2>Mintop technology startup provides clients security</h2>
                <p>
                  The phrasal sequence of the Lorem Ipsum text is now so and that
                  many the phrase when found, an alarm can be raised.
                </p>
              </div>
              {/* about single */}
              <div
                className="support-services wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <Link className="support-images" to={"#"}>
                <GiTeamUpgrade />
                </Link>
                <div className="support-content">
                  <h4>Team Management</h4>
                  <p>
                    The phrasal sequence of the Lorem Ipsum text is now so and
                    that many the phrase when found, an alarm can be raised.
                  </p>
                </div>
              </div>
              {/* about single */}
              <div
                className="support-services wow fadeInUp"
                data-wow-delay="0.7s"
              >
                <Link className="support-images" to={"#"}>
                <MdOutlineWaterfallChart />
                </Link>
                <div className="support-content">
                  <h4>live profitable trades</h4>
                  <p>
                    The phrasal sequence of the Lorem Ipsum text is now so and
                    that many the phrase when found, an alarm can be raised.
                  </p>
                </div>
              </div>
              {/* about single */}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="feature-content">
              <div className="feature-images">
                <img src="/assets/img/feature/vd2.jpg" alt="" className="first-img" />
                <img src="/assets/img/feature/sd1.jpg" alt="" className="over-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Feature Area */}
  </>
  
  )
}

export default FeatureServices