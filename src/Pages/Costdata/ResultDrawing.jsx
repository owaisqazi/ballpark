/* eslint-disable no-undef */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import BaseUrl from "../../Auth/BaseUrl";
const ResultDrawing = () => {
  const location = useLocation();
  const { result, data } = location?.state || {};
  if (!result) {
    return <div>Loading...</div>;
  }
  const estimateSections = result;
  const model = data;
  // const estimateSectionsanalysis = result.analysis;

  const newItems = estimateSections?.primary_estimate?.data
    ?.map((e) => (e?.dimension?.length ? e?.dimension[0] : null))
    .filter((item) => Boolean(item));
  console.log(newItems, "estimateSectionsdatas");
  const newItem = newItems?.length ? newItems[0] : null;
  console.log(newItem, "estimateSectionsdata");
  return (
    <div className="project-drawing d-flex flex-column align-items-center justify-content-center rounded-4">
      <div className="row mt-5">
        <h3 className="text-primary fw-bold text-capitalize mt-5 pb-2 col-lg-12 text-center">
          Cost Estimate
        </h3>
        <div className="container p-4">
          <div className="bg-white rounded-3 p-4">
            <div className="d-flex align-items-center mb-4">
              <Link
                className="btn btn-white rounded-0 d-flex align-items-center"
                to="/new-project"
              >
                <i className="fa fa-angle-left text-2xl"></i>&nbsp;Back
              </Link>
            </div>
            <div className="text-center">
              {/* <h1 className="text-dark">{model?.Model}</h1> */}
            </div>
            <div className="p-3 border shadow-md rounded h-100">
              <img
                src={BaseUrl?.CostImage + model?.image}
                alt="not found"
                className="img-fluid rounded mb-2"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "250px",
                }}
              />
              <p className="text-dark fw-bold">{model?.project_name}</p>
            </div>
            {/* {estimateSections?.data?.map(
              (item, index) =>
                item?.name && (
                  <div key={index} className="p-4 bg-white border rounded mb-4">
                    <h2 className="fw-semibold ">
                      <strong>Name:</strong>{" "}
                      <strong className="fw-semibold">
                        {item?.name}
                      </strong>
                    </h2>
                    {item?.dimension?.map((part, partIndex) => (
                      <div key={partIndex} className="mt-4">
                        <h3 className="">
                          <strong>{part?.Part}</strong>
                        </h3>
                        <div className="row mt-3">
                          {part?.Length && (
                            <div className="col-md-12">
                              <p className="text-lg ">
                                <strong>Length:</strong> {part?.Length}
                              </p>
                            </div>
                          )}
                          {part?.Height && (
                            <div className="col-md-12">
                              <p className="text-lg ">
                                <strong>Height:</strong> {part?.Height}
                              </p>
                            </div>
                          )}
                          {part?.Width && (
                            <div className="col-md-12">
                              <p className="text-lg ">
                                <strong>Width:</strong> {part?.Width}
                              </p>
                            </div>
                          )}
                          {part?.Area && (
                            <div className="col-md-12">
                              <p className="text-lg ">
                                <strong>Area:</strong> {part?.Area}
                              </p>
                            </div>
                          )}
                          {part?.Count && (
                            <div className="col-md-12">
                              <p className="text-lg ">
                                <strong>Count:</strong> {part?.Count}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className=" row">
                      {item?.cost?.Area && (
                        <div className="col-md-12">
                          <p className="text-lg ">
                            <strong>Total Area:</strong> {item?.cost?.Area}
                          </p>
                        </div>
                      )}
                      {item?.cost?.Cost && (
                        <div className="col-md-12">
                          <p className="text-lg ">
                            <strong>Cost:</strong> {item?.cost?.Cost}
                          </p>
                        </div>
                      )}
                      {item?.cost?.Total_Cost && (
                        <div className="col-md-12">
                          <p className="text-lg ">
                            <strong>Total Cost:</strong>{" "}
                            {item?.cost?.Total_Cost}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
            )}
            {/* Display Total Cost 
            {estimateSections?.data?.find((e) => e.Total_Cost)?.Total_Cost
              ?.Total_Cost && (
              <h2 className="p-4 fw-bold bg-white ">
                <strong className="fw-semibold text-dark">Total Cost:</strong>{" "}
                {
                  estimateSections?.data?.find((e) => e.Total_Cost)?.Total_Cost
                    ?.Total_Cost
                }
              </h2>
            )} */}
            {estimateSections?.primary_estimate?.data?.map((item, index) => {
              const newItem = item?.dimension?.length
                ? item?.dimension[0]
                : null;
              console.log(newItem, "newItem--->");
              return (
                <div
                  key={index}
                  className="p-4 bg-white border rounded mb-4 mt-4"
                >
                  {item?.name && (
                    <>
                      <h2 className="fw-semibold mb-4">
                        <strong>Material:</strong> {item?.name}
                      </h2>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            {newItem?.Part && <th>Part</th>}
                            {newItem?.Length && <th>Length</th>}
                            {newItem?.Height && <th>Height</th>}
                            {newItem?.Width && <th>Width</th>}
                            {newItem?.Area && <th>Area</th>}
                            {newItem?.Count && <th>Count</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {item?.dimension?.map((part, partIndex) => (
                            <tr key={partIndex}>
                              {part?.Part && <td>{part?.Part || "-"}</td>}
                              {part?.Length && <td>{part?.Length || "-"}</td>}
                              {part?.Height && <td>{part?.Height || "-"}</td>}
                              {part?.Width && <td>{part?.Width || ""}</td>}
                              {part?.Area && <td>{part?.Area || "-"}</td>}
                              {part?.Count && <td>{part?.Count || "-"}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* <h3 className="mt-4">Cost Details</h3> */}
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            {item?.cost?.Area && <th>Area</th>}
                            {item?.cost?.Cost && <th>Cost</th>}
                            {item?.cost?.Total_Cost && <th>Total Cost</th>}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {item?.cost?.Area && (
                              <td>{item?.cost?.Area || "-"}</td>
                            )}
                            {item?.cost?.Cost && (
                              <td>{item?.cost?.Cost || "-"}</td>
                            )}
                            {item?.cost?.Total_Cost && (
                              <td>{item?.cost?.Total_Cost || "-"}</td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                  {item?.Total_Cost?.Total_Cost !== undefined && (
                    <div className="col-md-12">
                      <p className="text-lg ">
                        <strong>Total Cost:</strong>{" "}
                        {item?.Total_Cost?.Total_Cost}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            {estimateSections?.secondary_estimate?.Calculations && (
              <>
                <div className="p-4 bg-white border rounded mb-4">
                  {estimateSections?.secondary_estimate?.Calculations && (
                    <>
                      <h2 className="fw-bold text-dark">Sub Structure:</h2>
                      <p>
                        <strong>Plan:</strong>{" "}
                        {estimateSections?.secondary_estimate.Plan}
                      </p>
                    </>
                  )}
                  <div>
                    <div>
                      {
                        estimateSections?.secondary_estimate?.Calculations &&
                        Object.keys(
                          estimateSections?.secondary_estimate?.Calculations
                        ).length > 0
                          ? Object.keys(
                              estimateSections?.secondary_estimate?.Calculations
                            ).map((key, index) => {
                              const value =
                                estimateSections?.secondary_estimate
                                  ?.Calculations[key];

                              return (
                                <div key={index}>
                                  <strong>{key}:</strong>
                                  <div>
                                    {/* Check if the value is an object and render nested keys if true */}
                                    {typeof value === "object" ? (
                                      Object.keys(value)?.map(
                                        (subKey, subIndex) => (
                                          <p key={subIndex}>
                                            <strong>{subKey}:</strong>{" "}
                                            {value[subKey]}
                                          </p>
                                        )
                                      )
                                    ) : (
                                      <span>{value}</span> // Render non-object values directly
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          : null // Optional: Display message if Calculations is empty or undefined
                      }
                    </div>
                  </div>
                </div>
                <h2 className="p-4 fw-bold bg-white ">
                  <strong className="fw-semibold text-dark">
                    Total Combined Cost:
                  </strong>{" "}
                  {estimateSections?.total_combined_cost}
                </h2>
              </>
            )}
            <div className="mb-5">
              {/* Additional cost breakdown or details can be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDrawing;
