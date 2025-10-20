import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ handleShow }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleShowLogout = () => {
    localStorage.clear();
    // window.location.reload();
    navigate("/login");
  };

  return (
    <>
      <header className={`header-one header-one1 ${isScrolled ? 'scrolled' : 'scrolled'}`}>
        <div
          id="sticker"
          className="header-area header-area-2 header-area-3 header-one1"
        ></div>
        <nav
          className={`navbar navbar-expand-lg fixed-steky ${isScrolled ? 'scrolled' : 'scrolled'}`}
          id="ResponsiveCssNav2"
        >
          <div className="container-fluid">
            <Link className="navbar-brand navImage2 d-flex me-auto" to={"/"}>
              <img
                src="/logo.PNG"
                alt=""
                width="20%"
                height="20%"
              /> <span className="text-white d-md-block d-none my-2">In the Ballpark</span>
            </Link>
            <Link
              className="navbar-toggler text-white"
              // type="button"
              data-bs-toggle="collapse"
              onClick={toggleNavbar}
              aria-controls="navbarSupportedContent"
              aria-expanded={isNavbarOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <FaBars />
            </Link>
            <div
              className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`}
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item d-none">
                  <Link
                    className="nav-link text-white fs-5 active fs-5"
                    aria-current="page"
                    to={"/"}
                    // Set background to transparent
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item d-none">
                  <Link
                    className="nav-link text-white fs-5"
                    to={"/ballpark"}
                    // Set background to transparent
                  >
                    In the Ballpark 2.0
                  </Link>
                </li>
                <li className="nav-item d-none">
                  <Link
                    className="nav-link text-white fs-5"
                    to={"/navigating-park"}
                    // onClick={() => handleBackgroundColorChange(true)} // Set background to dark
                  >
                     Navigating the Park
                  </Link>
                </li>
                <li className="nav-item d-none">
                  <Link
                    className="nav-link text-white fs-5"
                    to={"/contact"}
                    // Set background to transparent
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <form className="d-flex">
                {token ? (
                  <Link
                    to={"/login"}
                    onClick={handleShowLogout}
                    className="hd-btn anti-btn"
                  >
                    <i style={{ color: "black", fontSize: "20px" }}>
                      {/* <TiMessages /> */}
                    </i>
                    Logout
                  </Link>
                ) : (
                  <Link onClick={handleShow} className="hd-btn anti-btn">
                    Sign up/login
                  </Link>
                )}
              </form>
            </div>
          </div>
        </nav>
      </header>
      {/* Responsive header  */}
    </>
  );
};

export default Header;
