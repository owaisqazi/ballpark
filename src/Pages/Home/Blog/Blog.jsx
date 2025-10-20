import React from 'react'
import { Link } from 'react-router-dom'


const Blog = () => {
  return (
    <>
    {/*Blog Area Start*/}
    <div className="blog-area blog-area-3 fix area-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="section-headline text-center">
              <div className="section-center-head">
                <p className="top-head">Our &amp; Consultants Agents</p>
              </div>
              <h2>Meet Our Consultant </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {/* start single blog */}
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="single-blog home-last-blog" style={{height:"200px"}}>
              <div className="blog-image d-flex justify-content-center text-center items-center">
                <div className="blog-content">
                <Link to={""}>
                  <h4>Jane Doe - Strategy Expert</h4>
                    <p>Jane has over 10 years of experience in business strategy and development, helping businesses achieve their goals.</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End single blog */}
          {/* start single blog */}
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="single-blog home-last-blog" style={{height:"200px"}}>
              <div className="blog-image d-flex justify-content-center text-center items-center">
                <div className="blog-content">
                <Link to={""}>
                  <h4>John Smith-Marketing Specialist</h4>
                    <p>With a creative and data-driven approach, John has been instrumental in turning around the marketing strategies of several companies.</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End single blog */}
          {/* start single blog */}
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="single-blog home-last-blog" style={{height:"200px"}}>
              <div className="blog-image d-flex justify-content-center text-center items-center">
                {/* <Link className="image-scale" style={{height:"80px"}} to={"#"}>
                  {/* <img src="/assets/img/blog/b3.jpg" alt="" /> */}
                  {/* <div className="blog-item-date px-0">
                    <span className="date-type" style={{fontSize:"12px"}}>Alex Johnson - Financial </span>
                    <span className="years-type" style={{fontSize:"12px"}}>Advisor</span>
                  </div>
                </Link>  */}
                <div className="blog-content">
                  {/* <div className="blog-meta">
                    <span className="admin-type">
                      <i className="fa fa-user" />
                      Admin
                    </span>
                    <span className="comments-type">
                      <i className="fa fa-comment-o" />
                      07
                    </span>
                  </div> */}
                <Link to={""}>
                  <h4>Alex Johnson - Financial Advisor</h4>
                    <p>Alex's expertise in financial planning and investment strategies has helped businesses optimize their financial performance.</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End single blog */}
        </div>
      </div>
    </div>
    {/*End Blog Area*/}
  </>
  
  )
}

export default Blog