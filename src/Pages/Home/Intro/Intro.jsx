import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import 'aos/dist/aos.css';
import AOS from 'aos';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Parallax, Pagination, Navigation } from "swiper/modules";

const Intro = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // You can adjust the duration as needed
  }, []);
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={800}
        parallax={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Parallax, Pagination, Navigation]}
        className="mySwiper bg_colorthem"
      >
        <SwiperSlide>
          {/* Start intro area */}
          <section className="intro-area intro-home-2 intro-area-3 " data-aos="zoom-in" data-aos-duration="3000">
            <div className="hero-slider">
              <div className="slider-active">
                <div
                  className="single-slide slider-height d-flex align-items-center fade-in-slide"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="/assets/background-bg.jpg"
                    alt="Intro Background"
                    className="background-img"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: -1,
                      filter: "brightness(0.7)",
                      transition: "transform 1s ease-in-out",
                    }}
                  />
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="slide-all-text text-center" data-aos="fade-up"
     data-aos-anchor-placement="bottom-center">
                          <h4 className="title-1 animate-text">
                            Set builders, creative agencies, and designers
                            alike.
                            <br />
                            Witness the first AI to cost your designs and
                            technical drawings.
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* End intro area */}
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Intro;
