import React from 'react'
import { Link } from 'react-router-dom';

const Teams = () => {
  return (
    <>
  {/* Teams area start */}
  <div className="team-area area-padding-2 pt-4">
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="text-inner p-0">
            <div className="text-service text-center">
              {/* <p className="top-head">Best Experts working our plateform</p> */}
              <h2>Our Services</h2>
              <p>
              Our consultancy services are tailored to meet the unique needs of each client, providing expert advice and strategic guidance to help you navigate challenges and seize opportunities in your industry. With a team of seasoned consultants, we offer personalized solutions that drive success and deliver measurable results.
              </p>
            </div>
            {/* <div className="service-more-btn">
              <Link className="anti-btn" to="/service">
                More Services{" "}
                <span>
                <FaArrowTurnUp />
                </span>
              </Link>
            </div> */}
          </div>
        </div>
        {/* Single team member */}
        <div className="col-xl-6 col-lg-6 col-md-6">
          <div className="team-member-inner">
            <div className="single-member">
              <div className="team-img">
                <img src="/assets/img/team/t1.jpg" alt="" />
              </div>
              <div className="team-content">
                <h4>
                <Link to={""}>Strategy Consulting</Link>
                </h4>
                <p>Our strategy consultants help you identify and plan powerful strategies to drive business growth and innovation.</p>
                {/* <ul className="team-hover">
                  <li>
                  <Link to={""}>
                      <i className="fa fa-facebook" />
                    </Link>
                  </li>
                  <li>
                  <Link to={""}>
                      <i className="fa fa-twitter" />
                    </Link>
                  </li>
                  <li>
                  <Link to={""}>
                      <i className="fa fa-pinterest" />
                    </Link>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
        {/* Single team member */}
        <div className="col-xl-6 col-lg-6 col-md-6">
          <div className="team-member-inner">
            <div className="single-member">
              <div className="team-img">
                <img src="/assets/img/team/t2.jpg" alt="" />
              </div>
              <div className="team-content">
                <h4>
                <Link to={""}>Marketing Advice</Link>
                </h4>
                <p>Expert marketing consultants guide you in crafting effective marketing strategies to enhance your market presence and customer engagement.</p>
                {/* <ul className="team-hover">
                  <li>
                  <Link to={""}>
                      <i className="fa fa-facebook" />
                    </Link>
                  </li>
                  <li>
                  <Link to={""}>
                      <i className="fa fa-twitter" />
                    </Link>
                  </li>
                  <li>
                  <Link to={""}>
                      <i className="fa fa-pinterest" />
                    </Link>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
        {/* Single team member */}
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="team-member-inner">
            <div className="single-member">
              <div className="team-img">
                <img src="/assets/img/team/t3.jpg" alt="" />
              </div>
              <div className="team-content">
                <h4>
                <Link to={""}>Financial Planning</Link>
                </h4>
                <p>Our financial experts provide insights into financial management, budgeting, and investment strategies to maximize your financial health.</p>
                {/* <ul className="team-hover">
                  <li>
                  <Link to={""}>
                      <i className="fa fa-facebook" />
                    </Link>
                  </li>
                  <li>
                  <Link to={""}>
                      <i className="fa fa-twitter" />
                    </Link>
                  </li>
                  <li>
                  <Link to={""}>
                      <i className="fa fa-pinterest" />
                    </Link>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
        <div className="d-lg-none d-xl-none col-md-6">
          <div className="team-member-inner">
            <div className="single-member">
              <div className="team-img">
                <img src="/assets/img/team/t5.jpg" alt="" />
              </div>
              <div className="team-content">
                <h4>
                <Link to={""}>james</Link>
                </h4>
                <p>Marketer</p>
                {/* <ul className="team-hover">
                  <li>
                  <Link to={""}>
                      <i className="fa fa-facebook" />
                    </Link>
                  </li>
                  <li>
                  <Link to={""}>
                      <i className="fa fa-twitter" />
                    </Link>
                  </li>
                  <li>
                  <Link to={""}>
                      <i className="fa fa-pinterest" />
                    </Link>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
        {/* Single team member */}
      </div>
    </div>
  </div>
  {/* Teams area end */}
</>

  )
}

export default Teams