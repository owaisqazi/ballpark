import React, { useEffect, useState } from "react";
import BaseUrl from "../../Auth/BaseUrl";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const PostProject = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const GetProjects = async () => {
    try {
      const response = await axios?.get(
        `${BaseUrl.baseurlImage}GetCostEstimate/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        response?.data?.message?.map((e) => JSON.parse(e.estimate)),
        "GetCostEstimate"
      );
      setSearchResults(response?.data);
      console.log(response?.data, "GetCostEstimate");
      // setSearchData(response?.data?.message?.map(e=>e.estimate));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  useEffect(() => {
    GetProjects();
    // eslint-disable-next-line
  }, []);
  console.log(searchResults, "searchResults");
  // Calculate the paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults?.message?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Pagination change handler
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);


  const handleClick = (result) => {
    navigate("/resulte-data", { state: {result,from: window.location.pathname} });
  };
  return (
    <>
    <div className="container mt-4">
       <Link
        type="button"
        className="btn btn-white d-flex align-items-center"
        to={"/"}
      >
        <i className="fa fa-angle-left" style={{ fontSize: "25px" }}></i>
        &nbsp; <span>Back</span>
      </Link>
    </div>
    <div className="project-drawing d-flex flex-column align-items-center justify-content-center rounded-4">
      <div className="row w-100">
        <h3 className="text-primary fw-bold text-capitalize pb-2 col-lg-12 text-center">
          Past Project
        </h3>
        <div className="container">
          <div className="bg-white rounded-3">
          {currentItems?.length > 0? (
              <div className="search-results my-4 container">
                <div
                  className={`row w-100 ${
                    currentItems.length === 1 ? "justify-content-center" : ""
                  }`}
                >
                  {currentItems.map((result) => (
                    <div
                    onClick={() => handleClick(result)}
                      key={result?.id}
                      className={`${
                        currentItems.length === 1
                          ? "col-md-6 col-lg-4" // For single data centered
                          : "col-12 col-sm-6 col-md-4 col-lg-3" // For multiple data, responsive grid
                      } mb-4`}
                    >{ console.log(result, "searchResults")}
                      <div className="p-3 border shadow-md rounded h-100">
                        <img
                          src={result?.image_url}
                          alt="not found"
                          className="img-fluid rounded mb-2"
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "250px",
                          }}
                        />
                        <p className="text-dark fw-bold">
                          {result?.project_name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination Component */}
                {searchResults?.message?.length > itemsPerPage && (
                  <Pagination className="justify-content-center mt-4 d-flex">
                    {Array.from(
                      {
                        length: Math.ceil(
                          searchResults?.message?.length / itemsPerPage
                        ),
                      },
                      (_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      )
                    )}
                  <br />
                  <br />
                  <br />
                  <br />
                  </Pagination>
                )}
              </div>
            ):<p className="text-center">No Project Drawing...</p>}
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
    </>
  );
};

export default PostProject;
