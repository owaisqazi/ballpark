import React from "react";
import { Link, useLocation } from "react-router-dom";
const ResulteData = () => {
  const location = useLocation();
  const { result, from } = location?.state || {};
  const previousPath = from || "No previous path";

  if (!result) {
    return <div>Loading...</div>;
  }

  const estimateSections = JSON.parse(result?.estimate || "[]");
  // const estimateSectionsanalysis = JSON.parse(result?.analysis || "[]");
  console.log(previousPath, estimateSections, "result----->");
  return (
    <div className="project-drawing flex-column rounded-4">
      <div className="row mt-5 w-100">
        <div className="p-4">
          <div className="bg-white rounded-3 p-4 border">
            <div className="d-flex align-items-center mb-4">
              {previousPath === "/post-project" ? (
                <Link
                  className="btn btn-white rounded-0 d-flex align-items-center"
                  to={"/post-project"}
                >
                  <i className="fa fa-angle-left text-2xl"></i>&nbsp;Back
                </Link>
              ) : (
                <Link
                  className="btn btn-white rounded-0 d-flex align-items-center"
                  to={"/project-drawing"}
                >
                  <i className="fa fa-angle-left text-2xl"></i>&nbsp;Back
                </Link>
              )}
            </div>
            <div className="text-center">
              {/* <h1 className="text-dark">
                {result?.Model ? result?.Model : result?.model}
              </h1> */}
            </div>
            <div className="p-3 shadow-md rounded h-100">
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
              <p className="text-dark fw-bold">Name: {result?.project_name}</p>
            </div>
            {estimateSections?.primary_estimate?.data?.map((item, index) => {
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
                            <th>Part</th>
                            {item?.dimension?.some((part) => part?.Length) && (
                              <th>Length</th>
                            )}
                            {item?.dimension?.some((part) => part?.Height) && (
                              <th>Height</th>
                            )}
                            {item?.dimension?.some((part) => part?.Width) && (
                              <th>Width</th>
                            )}
                            {item?.dimension?.some((part) => part?.Area) && (
                              <th>Area</th>
                            )}
                            {item?.dimension?.some((part) => part?.Count) && (
                              <th>Count</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {item?.dimension?.map((part, partIndex) => (
                            <tr key={partIndex}>
                              {part?.Part && <td>{part?.Part || "-"}</td>}
                              {part?.Length && <td>{part?.Length || "-"}</td>}
                              {part?.Height && <td>{part?.Height || "-"}</td>}
                              {part?.Width && <td>{part?.Width || "-"}</td>}
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
                          {item?.cost?.Area&&<th>Area</th>}
                            {item?.cost?.Cost&& <th>Cost</th>}
                            {item?.cost?.Total_Cost&&<th>Total Cost</th>}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                          {item?.cost?.Area&&<td>{item?.cost?.Area || "-"}</td>}
                          {item?.cost?.Cost&&<td>{item?.cost?.Cost || "-"}</td>}
                          {item?.cost?.Total_Cost&& <td>{item?.cost?.Total_Cost || "-"}</td>}
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                  {item?.Total_Cost?.Total_Cost !== undefined && (
                    <div className="col-md-12">
                      <p className="text-lg">
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
            <div className="mb-4">
              {/* Additional cost breakdown or details can be added here */}
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default ResulteData;
