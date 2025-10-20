import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import BaseUrl from "../../Auth/BaseUrl";
// eslint-disable-next-line
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MaterialComponent from "./MaterialComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import SubStructure from "./SubStructure";

const StartQuote = () => {
  const [key, setKey] = useState("Past Project");
  const [TableHaderIndex, setTableHaderIndex] = useState([]);
  const [slectedValues, setslectedValues] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editedData, setEditedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [PdfTotalCostShow, setPdfTotalCostShow] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [SelectSubStructure, setSelectSubStructure] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    number: "",
    freestyle: "",
    freestylecost: "",
  });
  const [loading2, setLoading2] = useState(false);
  const [hideMarkup, setHideMarkup] = useState(true);
  const [hideMarkup2, setHideMarkup2] = useState(true);
  const token = localStorage.getItem("token");
  const OfftheshelfCost = localStorage.getItem("combinedTotal");
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([]);
  const [selectedValues, setSelectedValues] = useState("");
  const [SubStructureCost, setSubStructureCost] = useState(0);
  // const [Costdymic, setCostdymic] = useState(0);
  const [formData, setFormData] = useState({
    projectName: "",
    date: "",
    companyName: "",
    email: "",
    billToName: "",
    billToAddress: "",
    shipToName: "",
    shipToAddress: "",
  });

  console.log(formData.billToAddress, "formData--->");

  // clone input work hare
  const handleAddFields = () => {
    setInputFields([...inputFields, { freestyle: "", freestylecost: 0 }]); // Default freestylecost as 0
  };

  const handleRemoveFields = (index) => {
    const fields = [...inputFields];
    fields.splice(index, 1);
    setInputFields(fields);
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const fields = [...inputFields];
    // Convert to number for freestylecost, and allow it to be empty
    fields[index][name] = name === "freestylecost" && value === "" ? "" : name === "freestylecost" ? +value : value;
    setInputFields(fields);
  };

  // eslint-disable-next-line no-unused-vars
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // pdf modal hare
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setFormData({
      projectName: "",
      date: "",
      companyName: "",
      email: "",
      billToName: "",
      billToAddress: "",
      shipToName: "",
      shipToAddress: "",
    });
    setShow(false); // Close the modal
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Fetch project data
  // eslint-disable-next-line
  const getProjects = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl.baseurlImage}GetCostEstimate/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchResults(response?.data?.message || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line
    getProjects();
    // eslint-disable-next-line
  }, []);

  // Handle project selection change
  const handleSelectChange = (event) => {
    const projectName = event.target.value;
    const project = searchResults.find(
      (proj) => proj.project_name === projectName
    );

    if (project) {
      const data = JSON.parse(project?.estimate || "{}");
      setEditedData(data); // Set the estimate data
      setSelectedProject(project); // Set the selected project object
    } else {
      // If no project is found, reset the selection
      setSelectedProject(null);
    }

    console.log(project, "project");
  };
  const handleEdit = (itemIndex, partIndex, field, value) => {
    // Create a new object for immutability
    const updatedData = {
      ...editedData,
      primary_estimate: {
        ...editedData.primary_estimate,
        data: editedData.primary_estimate.data.map((item, idx) =>
          idx === itemIndex
            ? {
                ...item,
                dimension: item.dimension.map((part, pIdx) =>
                  pIdx === partIndex
                    ? { ...part, [field]: parseFloat(value) }
                    : part
                ),
              }
            : item
        ),
      },
    };

    setEditedData(updatedData); // Update the state with the new object
    console.log(updatedData, "updatedData----->");
  };

  // Save the edited data
  const handleSave = async (event) => {
    event.preventDefault();
    setLoading1(true);
    try {
      const formData = new FormData();
      formData.append("id", selectedProject?.id);
      formData.append("updated_data", JSON.stringify(editedData));
      await axios.put(`${BaseUrl.baseurlImage}Update_CostEstimate/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getProjects();
      setLoading1(false);
      setEditMode(false);
    } catch (error) {
      setLoading1(false);
      setEditMode(false);
      console.error("Error saving edits:", error);
      Swal.fire({
        title: error.response?.data?.detail || "Failed to save",
        icon: "error",
      });
    }
  };

  // Handle project deletion
  const handleDelete = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", selectedProject?.id);
      await axios.delete(`${BaseUrl.baseurlImage}DeleteCostEstimate/`, {
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Error deleting:", error);
      Swal.fire({
        title: error.response?.data?.message || "Failed to delete",
        icon: "error",
      });
    }
  };
  const emptyFields = inputFields.some(
    (field) => !field?.freestyle?.trim() || field?.freestylecost === 0);
  const handleGeneratePDF = async () => {
    const { freestyle } = inputValues;

    // Check if any freestyle or freestylecost field is empty
    if (selectedValues === "Internal use") {
      if (
        !formData?.projectName?.trim() ||
        !formData?.date?.trim() ||
        !formData?.companyName?.trim() ||
        !formData?.email?.trim() ||
        !formData?.billToName?.trim() ||
        !formData?.billToAddress?.trim() ||
        !formData?.shipToName?.trim() ||
        !formData?.shipToAddress?.trim() ||
        emptyFields // Make sure this is false if all fields are filled
      ) {
        setLoading2(false);
        Swal.fire({
          title: "Error",
          text: "Please fill all input fields before proceeding.",
          icon: "error",
        });
        return;
      }
    } else if (
      !formData?.projectName?.trim() ||
      !formData?.date?.trim() ||
      !formData?.companyName?.trim() ||
      !formData?.email?.trim() ||
      !formData?.billToName?.trim() ||
      !formData?.billToAddress?.trim() ||
      !formData?.shipToName?.trim() ||
      !formData?.shipToAddress?.trim() ||
      emptyFields
    ) {
      setLoading2(false);
      Swal.fire({
        title: "Error",
        text: "Please fill all input fields before proceeding.",
        icon: "error",
      });
      return;
    }
    setHideMarkup(false);

    setLoading2(true);
    let freestyleElement;

    try {
      if (key === "Off the Shelf") {
        setPdfTotalCostShow(true);
        setHideMarkup(false);
        const element = document.getElementById("Off-the-Shelf");
        if (!element) {
          console.error("PDF element not found");
          setLoading2(false);
          return;
        }

        // Hide freestyle field if empty
        if (!freestyle?.trim()) {
          freestyleElement = element.querySelector("#Free-Style-Container");
          if (freestyleElement) {
            freestyleElement.style.display = "none";
          }
        }
        // Handle freestyle field based on selected values
        freestyleElement = element.querySelector("#Free-Style-Container");
        if (selectedValues === "External use") {
          setHideMarkup(false);
          setHideMarkup2(false);
          if (freestyleElement) freestyleElement.style.display = "none";
        }
        // Hide buttons before generating PDF
        const buttons = element.querySelectorAll("button");
        const select = element.querySelectorAll("select");
        buttons.forEach((button) => (button.style.display = "none"));
        select.forEach((select) => (select.style.display = "none"));

        const options = {
          margin: 5, // Reduced margin to fit more content
          filename: "Off-the-Shelf",
          image: { type: "png", quality: 1 },
          html2canvas: {
            letterRendering: true,
            allowTaint: true,
            useCORS: true,
            logging: false,
            scale: 2.5, // Increased scale to fit content on a single page
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // Changed to A2 format for more space
        };
        // eslint-disable-next-line
        await html2pdf().from(element)?.set(options)?.save();
      } else if (key === "Past Project") {
        setPdfTotalCostShow(true);
        const element = document.getElementById("my-Pdf");
        if (!element) {
          console.error("PDF element not found");
          setLoading2(false);
          return;
        }
        // Handle freestyle field based on selected values
        // freestyleElement = element.querySelector("#Free-Style-Container");
        // if (selectedValues === "External use") {
        //   if (freestyleElement) freestyleElement.style.display = "none";
        // }

        const buttons = element.querySelectorAll("button");
        const select = element.querySelectorAll("select");
        buttons.forEach((button) => (button.style.display = "none"));
        select.forEach((select) => (select.style.display = "none"));

        const options = {
          margin: 5, // Reduced margin to fit more content
          filename: "my-Pdf",
          image: { type: "jpeg", quality: 1 },
          html2canvas: {
            letterRendering: true,
            allowTaint: true,
            useCORS: true,
            logging: false,
            scale: 2.5, // Increased scale to fit content on a single page
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // Changed to A2 format for more space
        };
        // eslint-disable-next-line
        await html2pdf()?.from(element)?.set(options)?.save();
      }
    } catch (error) {
      setShow(false);
      setPdfTotalCostShow(false);
      setLoading2(false);
      console.error("Error generating PDF:", error);
    } finally {
      // Show buttons again after PDF is generated
      setHideMarkup(true);
      const buttons = document.querySelectorAll("button");
      const select = document.querySelectorAll("select");
      select.forEach((select) => (select.style.display = "inline-block"));
      buttons.forEach((button) => (button.style.display = "inline-block"));

      // Show the freestyle field again after the PDF is generated
      if (freestyleElement) {
        freestyleElement.style.display = "block"; // or "inline-block" based on your layout needs
      }
      setFormData({
        projectName: "",
        date: "",
        companyName: "",
        email: "",
        billToName: "",
        billToAddress: "",
        shipToName: "",
        shipToAddress: "",
      });
      setLoading2(false);
      setPdfTotalCostShow(false);
      setHideMarkup2(true);
      setShow(false);
    }
  };

  let TotalCost;
  try {
    // Check if `selectedProject?.estimate` is a valid JSON string
    TotalCost = selectedProject?.estimate
      ? JSON.parse(selectedProject?.estimate)
      : null;
    console.log(TotalCost, ";TotalCost");
  } catch (error) {
    console.error("Error parsing JSON:", error);
    TotalCost = null;
  }

  // eslint-disable-next-line no-unused-vars
  const Totalcost =
    TotalCost?.primary_estimate?.data?.map((e) => e?.Total_Cost?.Total_Cost) ||
    [];

  // oftheshel work
  const ShowTotalcost =
    TotalCost?.primary_estimate?.data?.map((e) =>
      parseFloat(e?.Total_Cost?.Total_Cost)
    ) || [];

  // Filter out any NaN values from ShowTotalcost
  // eslint-disable-next-line no-unused-vars
  const validCosts = ShowTotalcost.filter((cost) => !isNaN(cost));

  // Calculate the total freestylecost from inputFields
  const freestylecost = inputFields.reduce((sum, field) => {
    const cost = parseFloat(field.freestylecost);
    return sum + (isNaN(cost) ? 0 : cost); // Add 0 if NaN
  }, 0);
  console.log(
  freestylecost,
  SubStructureCost,
  editedData?.total_combined_cost ?? 0, "inputFields ==>");
  // Add the total freestylecost to the sum of valid TotalCosts
  const combinedTotal =
  // validCosts?.reduce((sum, cost) => sum + cost, 0) +
  freestylecost +
  SubStructureCost + 
  (editedData?.total_combined_cost ?? 0)
  console.log(combinedTotal, "inputFields ==>");


  // Perform the addition
  const OfftheshelfCostCombined = parseFloat(OfftheshelfCost) + freestylecost;
  const total_combined_cost =
    parseFloat(editedData?.total_combined_cost) + parseFloat(combinedTotal);
  console.log(
    combinedTotal,
    editedData?.total_combined_cost,
    "editedData--->"
  );
  return (
    <div className="container mt-4">
      <Link
        type="button"
        className="btn btn-white d-flex align-items-center"
        to={"/new-project"}
      >
        <i className="fa fa-angle-left" style={{ fontSize: "25px" }}></i>
        &nbsp; <span>Back</span>
      </Link>
      <h3 className="text-primary fw-bold text-center mb-4">
        Choose a Project
      </h3>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
          setslectedValues(null);
          setSelectedProject(null);
          setInputValues({});
          setInputFields([]);
        }}
        className="mb-3"
      >
        <Tab eventKey="Past Project" title="Past Project">
          <div
            className={
              selectedProject
                ? "shadow-none rounded-0"
                : "shadow-none rounded-0 border-0"
            }
          >
            <div className="mb-3 col-lg-12">
              <select
                className="form-select"
                onChange={handleSelectChange}
                value={selectedProject?.project_name || ""} // Ensure value is bound to selectedProject's project_name
              >
                <option disabled value="">
                  Select a Project
                </option>
                {searchResults.map((project, index) => (
                  <option key={index} value={project.project_name}>
                    {project.project_name}
                  </option>
                ))}
              </select>
            </div>
            {/* <h1 className="text-center text-dark mb-4">
              {!formData?.projectName &&
                !formData?.date &&
                !formData?.companyName &&
                !formData?.email &&
                !formData?.billToName &&
                !formData?.billToAddress &&
                !formData?.shipToName &&
                !formData?.shipToAddress &&
                selectedProject?.Model}
            </h1> */}
            <div id="my-Pdf">
              {selectedProject && (
                <>
                  {!formData?.projectName &&
                    !formData?.date &&
                    !formData?.companyName &&
                    !formData?.email &&
                    !formData?.billToName &&
                    !formData?.billToAddress &&
                    !formData?.shipToName &&
                    !formData?.shipToAddress && (
                      <>
                        <h4 className="mb-3">
                          Project Name:{" "}
                          <span className="text-primary">
                            {selectedProject?.project_name}
                          </span>
                        </h4>
                        <div className="text-center mb-4">
                          <img
                            src={selectedProject?.image_url}
                            alt="Project"
                            className="img-fluid"
                            style={{ maxHeight: "300px" }}
                          />
                        </div>
                      </>
                    )}
                  <button
                    className={`btn btn-primary w-100 mb-3 ${
                      loading ? "disabled" : ""
                    }`}
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-trash me-2"></i> Delete Project
                      </>
                    )}
                  </button>
                  <div className="text-end col-lg-12">
                    <button
                      className={`btn mb-3 w-auto ${
                        editMode ? "btn-danger" : "btn-primary"
                      }`}
                      onClick={() => setEditMode((prev) => !prev)}
                    >
                      {editMode ? (
                        <>
                          <i className="fas fa-times"></i>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-edit"></i>
                        </>
                      )}
                    </button>
                  </div>
                  {formData?.projectName &&
                    formData?.date &&
                    formData?.companyName &&
                    formData?.email &&
                    formData?.billToName &&
                    formData?.billToAddress &&
                    formData?.shipToName &&
                    formData?.shipToAddress && (
                      <div className="row">
                        <div className="col-lg-6 ps-0">
                          <img
                            src="./logo.PNG"
                            alt=""
                            width={150}
                            height={150}
                          />
                          &nbsp;
                          <span className="fs-3 fw-bold ms-0 ps-0">
                            In the Ballpark
                          </span>
                        </div>
                        <div className="col-lg-6 pt-5">
                          <strong>&nbsp;Project Name:</strong>&nbsp;
                          {formData?.projectName}
                          <br />
                          <strong>&nbsp;Date:</strong>&nbsp;{formData?.date}
                          <br />
                          <strong>&nbsp;Company Name:</strong>&nbsp;
                          {formData?.companyName}
                          <br />
                          <strong>&nbsp;Email Address:</strong>&nbsp;
                          {formData?.email}
                        </div>
                        <div className="col-lg-6">
                          <h3 className="text-start mb-0">BILL TO</h3>
                          <strong>&nbsp;{formData?.billToName}</strong>
                          <p className="text-dark">
                            &nbsp;{formData?.billToAddress}.
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <h3 className="text-start mb-0">SHIP TO</h3>
                          <strong>&nbsp;{formData?.shipToName}</strong>
                          <p className="text-dark">
                            &nbsp;{formData?.shipToAddress}
                          </p>
                        </div>
                        <th
                          style={{
                            borderBottom: "1px solid black",
                            width: "98.8%",
                          }}
                          className="ms-2"
                        />
                      </div>
                    )}
                  {editedData?.primary_estimate?.data?.map(
                    (item, itemIndex) =>
                      item?.name && (
                        <div
                          key={itemIndex}
                          className="mb-4 border rounded p-3 w-100"
                        >
                          <h5 className="text-secondary">
                            <strong>Material:</strong> {item?.name}
                          </h5>
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Part</th>
                                {item?.dimension?.some(
                                  (part) => part?.Height
                                ) && <th>Height</th>}
                                {item?.dimension?.some(
                                  (part) => part?.Width
                                ) && <th>Width</th>}
                                {item?.dimension?.some(
                                  (part) => part?.Length
                                ) && <th>Length</th>}
                                {item?.dimension?.some(
                                  (part) => part?.Area
                                ) && <th>Area</th>}
                                {item?.dimension?.some(
                                  (part) => part?.Count
                                ) && <th>Count</th>}
                                {item?.dimension?.some(
                                  (part) => part?.Volume
                                ) && <th>Volume</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {item?.dimension?.map((part, partIndex) => (
                                <tr key={partIndex}>
                                  <td>{part?.Part || "-"}</td>
                                  {part?.Height && (
                                    <td>
                                      {editMode ? (
                                        <input
                                          type="number"
                                          className="form-control"
                                          value={part?.Height || ""} // Use `value` instead of `defaultValue`
                                          onChange={(e) =>
                                            handleEdit(
                                              itemIndex,
                                              partIndex,
                                              "Height",
                                              e.target.value
                                            )
                                          }
                                        />
                                      ) : (
                                        part?.Height
                                      )}
                                    </td>
                                  )}

                                  {part?.Width && (
                                    <td>
                                      {editMode ? (
                                        <input
                                          type="number"
                                          className="form-control"
                                          value={part?.Width || ""} // Use `value` instead of `defaultValue`
                                          onChange={(e) =>
                                            handleEdit(
                                              itemIndex,
                                              partIndex,
                                              "Width",
                                              e.target.value
                                            )
                                          }
                                        />
                                      ) : (
                                        part?.Width
                                      )}
                                    </td>
                                  )}
                                  {part?.Length && <td>{part?.Length}</td>}
                                  {part?.Area && <td>{part?.Area}</td>}
                                  {part?.Count && <td>{part?.Count}</td>}
                                  {part?.Volume && <td>{part?.Volume}</td>}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {item?.cost && (
                            <>
                              {/* <h6 className="text-secondary mt-3">
                                Cost Details
                              </h6> */}
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    {item?.cost?.Area && <th>Area</th>}
                                    {item?.cost?.Length && <th> Length</th>}
                                    {item?.cost?.Cost && <th>Cost</th>}
                                    {item?.cost?.Total_Cost && (
                                      <th>Total Cost</th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {item?.cost?.Area && (
                                      <td>{item?.cost?.Area}</td>
                                    )}
                                    {item?.cost?.Length && (
                                      <td>{item?.cost?.Length}</td>
                                    )}
                                    {item?.cost?.Cost && (
                                      <td>{item?.cost?.Cost}</td>
                                    )}
                                    {item?.cost?.Total_Cost && (
                                      <td>{item?.cost?.Total_Cost}</td>
                                    )}
                                  </tr>
                                </tbody>
                              </table>
                            </>
                          )}
                        </div>
                      )
                  )}

                  {/* {Totalcost !== undefined && (
                    <div className="col-md-12 mt-2 mt-lg-0">
                      <p className="mb-3">
                        <strong>Total:</strong> {Totalcost || ""}
                      </p>
                    </div>
                  )} */}
                  {editedData?.secondary_estimate?.Calculations && (
                    <>
                      <div className="p-4 bg-white border rounded mb-4">
                        {editedData?.secondary_estimate?.Calculations && (
                          <>
                            <h2 className="fw-bold text-dark">
                              Sub Structure:
                            </h2>
                            <p>
                              <strong>Plan:</strong>{" "}
                              {editedData?.secondary_estimate.Plan}
                            </p>
                          </>
                        )}
                        <div>
                          <div>
                            {
                              editedData?.secondary_estimate?.Calculations &&
                              Object.keys(
                                editedData?.secondary_estimate?.Calculations
                              ).length > 0
                                ? Object.keys(
                                    editedData?.secondary_estimate?.Calculations
                                  ).map((key, index) => {
                                    const value =
                                      editedData?.secondary_estimate
                                        ?.Calculations[key];

                                    return (
                                      <div key={index}>
                                        <strong>{key}:</strong>
                                        <div>
                                          {/* Check if the value is an object and render nested keys if true */}
                                          {typeof value === "object" ? (
                                            Object.keys(value)?.map(
                                              (subKey, subIndex) => {
                                                console.log(value,"subKey--->");
                                                // const Cost=value?value['Total Cost']:0
                                                return(
                                                <p key={subIndex}>
                                                  <strong>{subKey}:</strong>{" "}
                                                  {value[subKey]}
                                                </p>
                                                )
                                              }
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
                      {/* <h2 className="p-4 fw-bold bg-white ">
                        <strong className="fw-semibold text-dark">
                          Total Combined Cost:
                        </strong>{" "}
                        {editedData?.total_combined_cost}
                      </h2> */}
                    </>
                  )}
                  <div id="Free-Style-Container">
                    {SelectSubStructure && (
                      <>
                        <label
                          htmlFor="Free Style"
                          className="fs-5 fw-bold text-primary mb-0"
                        >
                          Sub-Structure
                        </label>
                        <SubStructure
                          setSelectSubStructure={setSelectSubStructure}
                          HideMarkup={hideMarkup}
                          loading2={loading2}
                          setSubStructureCost={setSubStructureCost}
                        />
                      </>
                    )}
                    {!SelectSubStructure && (
                      <button
                        type="button"
                        className="btn text-white w-100 footer-area-bottom-2 my-1"
                        onClick={() => setSelectSubStructure(true)}
                      >
                        <FontAwesomeIcon icon={faPlus} /> Add Sub Structure
                      </button>
                    )}
                    {inputFields.length === 0 ? (
                      <div className="text-center my-3">
                        <button
                          type="button"
                          className="btn text-white w-100 footer-area-bottom-2 my-1"
                          onClick={handleAddFields}
                        >
                          <FontAwesomeIcon icon={faPlus} /> Add Free Style
                        </button>
                      </div>
                    ) : (
                      <>
                        {hideMarkup && (
                          <label
                            htmlFor="Free Style"
                            className="fs-5 fw-bold text-primary"
                          >
                            Free Style
                          </label>
                        )}
                        {inputFields?.map((input, index) => (
                          <div className="row mb-3 mt-1" key={index}>
                            {hideMarkup && (
                              <>
                                <div className="col-lg-6">
                                  <input
                                    type="text"
                                    className="form-control border-secondary p-2"
                                    name="freestyle"
                                    placeholder="Labour, Transportation, etc"
                                    value={input?.freestyle}
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                    required
                                  />
                                </div>
                                <div className="col-lg-6 position-relative">
                                  <input
                                    type="number"
                                    className="form-control border-secondary p-2"
                                    name="freestylecost"
                                    placeholder="Cost"
                                    value={input?.freestylecost}
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                    required
                                  />
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "-20px",
                                      right: "0px",
                                    }}
                                  >
                                    {index >= 0 && (
                                      <button
                                        type="button"
                                        className="btn btn-danger rounded-circle curser-pointer"
                                        onClick={() =>
                                          handleRemoveFields(index)
                                        }
                                      >
                                        <FontAwesomeIcon icon={faTimes} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                    {inputFields?.length !== 0 && (
                      <div className="col-lg-12 w-100 my-2 text-end">
                        <button
                          type="button"
                          className="btn text-white footer-area-bottom-2 me-2"
                          onClick={handleAddFields}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    )}
                    {hideMarkup && (
                      <label
                        htmlFor="Free Style"
                        className="fs-5 fw-bold text-primary"
                      >
                        Total Cost:{" "}
                        {Number(combinedTotal) ? Number(combinedTotal).toFixed(2) : editedData?.total_combined_cost}
                      </label>
                    )}
                    <>
                      {formData?.projectName &&
                        formData?.date &&
                        formData?.companyName &&
                        formData?.email &&
                        formData?.billToName &&
                        formData?.billToAddress &&
                        formData?.shipToName &&
                        formData?.shipToAddress && (
                          <div
                            className="col-md-12"
                            style={{ borderTop: "1px solid black" }}
                          >
                            <div className="row">
                              <div className="col-lg-6 text-white">
                                no content
                              </div>
                              <div className="col-lg-6">
                                <div className="row mx-0">
                                  <div className="col-lg-8">
                                    <h5 className="m-1">SubTotal</h5>
                                  </div>
                                  <div className="col-lg-4 text-end">
                                    <h5 className="m-1">
                                      £
                                      {!SelectSubStructure
                                        ? editedData?.total_combined_cost
                                        : total_combined_cost?.toFixed(2)}
                                    </h5>
                                  </div>
                                </div>
                                {inputFields?.map((input, index) => (
                                  <div className="row mx-0" key={index}>
                                    <th
                                      style={{
                                        borderBottom: "1px solid black",
                                        width: "98.8%",
                                      }}
                                      className="ms-2"
                                    />
                                    <div className="col-lg-8">
                                      <h5 className="m-1">{input.freestyle}</h5>
                                    </div>
                                    <div className="col-lg-4 text-end">
                                      <h5 className="m-1">
                                        £{input.freestylecost}
                                      </h5>
                                    </div>
                                  </div>
                                ))}
                                <div className="row mx-0">
                                  <th
                                    style={{
                                      borderBottom: "1px solid black",
                                      width: "98.8%",
                                    }}
                                    className="ms-2"
                                  />
                                  <div className="col-lg-8">
                                    <h5 className="m-1">Total</h5>
                                  </div>
                                  <div className="col-lg-4 text-end">
                                    <h5 className="m-1">
                                      £
                                      {Number(combinedTotal) ? Number(combinedTotal).toFixed(2) : editedData?.total_combined_cost}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <th
                                style={{
                                  borderBottom: "1px solid black",
                                  width: "98.8%",
                                }}
                                className="ms-2 mb-1"
                              />
                            </div>
                          </div>
                        )}
                    </>
                  </div>
                  {editMode && (
                    <button
                      className={`btn btn-primary mt-3 w-100 ${
                        loading1 ? "disabled" : ""
                      }`}
                      type="submit"
                      onClick={handleSave}
                      disabled={loading1}
                    >
                      {loading1 ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i> Save Changes
                        </>
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
            {selectedProject && (
              <>
                <div className="col-md-12 text-center my-2">
                  <button
                    className={`btn btn-primary mb-3 mx-2 w-auto`}
                    type="button"
                    onClick={handleShow}
                  >
                    Save PDF
                  </button>
                </div>
              </>
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
        </Tab>
        <Tab eventKey="Off the Shelf" title="Off the Shelf">
          <div id="Off-the-Shelf">
            <div className="col-md-12">
              <select
                className="form-select my-2"
                onChange={(event) => {
                  setslectedValues(event.target.value);
                }}
                value={slectedValues || ""}
              >
                <option disabled value="">
                  Select the Category
                </option>
                <option value="Event shell">Event shell</option>
                <option value="Furniture">Furniture</option>
                <option value="Item">Item</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            {slectedValues === "Item" && (
              <>
                {formData?.projectName &&
                  formData?.date &&
                  formData?.companyName &&
                  formData?.email &&
                  formData?.billToName &&
                  formData?.billToAddress &&
                  formData?.shipToName &&
                  formData?.shipToAddress && (
                    <div className="row">
                      <div className="col-lg-6 ps-0">
                        <img src="./logo.PNG" alt="" width={150} height={150} />
                        &nbsp;
                        <span className="fs-3 fw-bold ms-0 ps-0">
                          In the Ballpark
                        </span>
                      </div>
                      <div className="col-lg-6 pt-5">
                        <strong>&nbsp;Project Name:</strong>&nbsp;
                        {formData?.projectName}
                        <br />
                        <strong>&nbsp;Date:</strong>&nbsp;{formData?.date}
                        <br />
                        <strong>&nbsp;Company Name:</strong>&nbsp;
                        {formData?.companyName}
                        <br />
                        <strong>&nbsp;Email Address:</strong>&nbsp;
                        {formData?.email}
                      </div>
                      <div className="col-lg-6">
                        <h3 className="text-start mb-0">BILL TO</h3>
                        <strong>&nbsp;{formData?.billToName}</strong>
                        <p className="text-dark">
                          &nbsp;{formData?.billToAddress}.
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <h3 className="text-start mb-0">SHIP TO</h3>
                        <strong>&nbsp;{formData?.shipToName}</strong>
                        <p className="text-dark">
                          &nbsp;{formData?.shipToAddress}
                        </p>
                      </div>
                      <th
                        style={{
                          borderBottom: "1px solid black",
                          width: "98.8%",
                        }}
                        className="ms-2"
                      />
                    </div>
                  )}
                <MaterialComponent
                  setTableHaderIndex={setTableHaderIndex}
                  TableHaderIndex={TableHaderIndex}
                  HideMarkup={hideMarkup}
                  inputFields={inputFields}
                  CostCombined={OfftheshelfCostCombined?.toFixed(2)}
                  formData={formData}
                  hideMarkup2={hideMarkup2}
                  loading2={loading2}
                />
                {inputFields.length !== 0 && hideMarkup && (
                  <label
                    htmlFor="Free Style"
                    className="fs-5 fw-bold text-primary"
                  >
                    Free Style
                  </label>
                )}
                {inputFields.length === 0 ? (
                  <div className="text-center my-3">
                    <button
                      type="button"
                      className="btn text-white w-100 footer-area-bottom-2"
                      onClick={handleAddFields}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add Free Style
                    </button>
                  </div>
                ) : (
                  inputFields.map((input, index) => (
                    <div className="row my-3" key={index}>
                      {hideMarkup && (
                        <>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control border-secondary p-2"
                              name="freestyle"
                              placeholder="Labour, Transportation, etc"
                              value={input?.freestyle}
                              onChange={(e) => handleInputChange(index, e)}
                              required
                            />
                          </div>
                          <div className="col-lg-6 position-relative">
                            <input
                              type="number"
                              className="form-control border-secondary p-2"
                              name="freestylecost"
                              placeholder="Cost"
                              value={input?.freestylecost}
                              onChange={(e) => handleInputChange(index, e)}
                              required
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: "-20px",
                                right: "0px",
                              }}
                            >
                              {index >= 0 && (
                                <button
                                  type="button"
                                  className="btn btn-danger rounded-circle curser-pointer"
                                  onClick={() => handleRemoveFields(index)}
                                >
                                  <FontAwesomeIcon icon={faTimes} />
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
                {PdfTotalCostShow && inputFields.length !== 0 && hideMarkup && (
                  <label
                    htmlFor="Free Style"
                    className="fs-5 fw-bold text-primary"
                  >
                    Total Cost : {OfftheshelfCostCombined?.toFixed(2)}
                  </label>
                )}
                {inputFields.length !== 0 && (
                  <div className="col-lg-12 w-100 my-2 text-end">
                    <button
                      type="button"
                      className="btn text-white footer-area-bottom-2 me-2"
                      onClick={handleAddFields}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                )}
                <div className="text-center">
                  <button
                    className={`btn w-auto btn-primary mb-3 mx-2`}
                    type="button"
                    onClick={handleShow}
                    // disabled={loading2}
                  >
                    <i className="fas fa-file-pdf me-2"></i> Save PDF
                  </button>
                </div>
                <br />
                <br />
                <br />
                <br />
              </>
            )}
          </div>
        </Tab>
        <Tab eventKey="Ballpark 2.0 Pictures" title="Ballpark 2.0 Pictures">
          <p className="text-center">Coming soon...</p>
        </Tab>
      </Tabs>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="border-bottom-0"></Modal.Header>
        <Modal.Body>
          <div className="card">
            <div className="row mb-3 w-100">
              <div className="col-md-6">
                <Form.Group controlId="projectName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="Enter project name"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row mb-3 w-100">
              <div className="col-md-6">
                <Form.Group controlId="companyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="email">
                  <Form.Label>Email Address of the Purchaser</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row mb-3 w-100">
              <div className="col-md-6">
                <h5>BILL TO</h5>
                <Form.Group controlId="billToName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="billToName"
                    value={formData.billToName}
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </Form.Group>
                <Form.Group controlId="billToAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="billToAddress"
                    value={formData.billToAddress}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <h5>SHIP TO</h5>
                <Form.Group controlId="shipToName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="shipToName"
                    value={formData.shipToName}
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </Form.Group>
                <Form.Group controlId="shipToAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="shipToAddress"
                    value={formData.shipToAddress}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row w-100">
              <div className="col-md-6">
                <Form.Check
                  label="Internal use"
                  type="checkbox"
                  name="internalUse"
                  checked={selectedValues === "Internal use"}
                  value="Internal use"
                  onChange={(e) =>
                    setSelectedValues(e.target.checked ? e.target.value : "")
                  }
                />
              </div>
              <div className="col-md-6">
                <Form.Check
                  label="External use"
                  type="checkbox"
                  name="externalUse"
                  checked={selectedValues === "External use"}
                  value="External use"
                  onChange={(e) =>
                    setSelectedValues(e.target.checked ? e.target.value : "")
                  }
                />
              </div>

              {selectedValues === "" ? null : (
                <button
                  className={`btn footer-area-bottom-2 text-white border-0 w-100 my-2 ${
                    loading2 ? "disabled" : ""
                  }`}
                  type="button"
                  onClick={handleGeneratePDF}
                  disabled={loading2}
                >
                  {loading2 ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-file-pdf me-2"></i> Download
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StartQuote;
