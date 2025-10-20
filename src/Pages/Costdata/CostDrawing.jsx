import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Stage, Layer, Line, Transformer, Image } from "react-konva";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Bezier } from "bezier-js";
import BaseUrl from "../../Auth/BaseUrl";
import "./Cost.css";
import Loader from "../../Component/Loader/Loader";

const CostDrawing = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  // const [loadingBeta, setLoadingBeta] = useState(false);
  const [cropper, setCropper] = useState();
  const [estimateData, setestimateData] = useState("");
  const [name, setName] = useState("");
  const [user_prompt, setuser_prompt] = useState("");
  const [user_plan, setuser_plan] = useState("");
  // @ts-ignore
  const [isCrop, setIsCrop] = useState(true);
  const [isCropImage, setIsCropImage] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [lines, setLines] = useState([]);
  const [isCurving, setIsCurving] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  // @ts-ignore
  // const [costEstimateData, setcostEstimateData] = useState(false);
  const [inputDirections, setInputDirections] = useState([]);
  const [deletedLines, setDeletedLines] = useState([]);
  const inputRef = useRef(null);
  const trRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  // @ts-ignore
  const [resmobile, setResmobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setResmobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [croppedImage]);
  console.log(croppedImage, "croppedImage==>");
  const handleCancel = () => {
    setCroppedImage(null);
    setImage(null);
    setIsCropImage(false);
  };

  const onUpload = () => {
    if (!name.trim()) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Project Name cannot be empty!",
        icon: "error",
      });
      return;
    }
    if (inputRef.current) {
      inputRef.current.click();
    }
    setLines([]);
    setIsCropImage(true);
  };

  const onChange = (e) => {
    if (!name.trim()) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Project Name cannot be empty!",
        icon: "error",
      });
      return;
    }
    const files = e.target.files || e.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getimgdata = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      setCroppedImage(croppedCanvas.toDataURL());
      setIsCrop(false);
      setIsCropImage(false);
    }
  };
  const handleBack = () => {
    if (croppedImage) {
      setIsCrop(true);
      setIsCropImage(true);
      setLines([]);
      setestimateData("");
    }
  };

  const toggleInputDirection = (index) => {
    const newInputDirections = inputDirections.slice();
    switch (newInputDirections[index]) {
      case "right":
        newInputDirections[index] = "bottom";
        break;
      case "bottom":
        newInputDirections[index] = "left";
        break;
      case "left":
        newInputDirections[index] = "top";
        break;
      case "top":
        newInputDirections[index] = "right";
        break;
      default:
        break;
    }
    setInputDirections(newInputDirections);
  };

  const handleInputChange = (e, index) => {
    const newInputValues = inputValues.slice();
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  const handleMouseDown = (e) => {
    if (lines.length > 0 && inputValues.some((value) => value.trim() === "")) {
      setShowMessage(true);
      return;
    }
    setShowMessage(false);

    const pos = e.target.getStage().getPointerPosition();
    if (isCurving) {
      const newLine = { points: [pos.x, pos.y], isCurve: true };
      setCurrentLine(newLine);
    } else {
      const newLine = { points: [pos.x, pos.y, pos.x, pos.y] };
      setCurrentLine(newLine);
    }
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (isDrawing && currentLine) {
      const pos = e.target.getStage().getPointerPosition();
      if (isCurving) {
        const newLine = {
          ...currentLine,
          points: [...currentLine.points, pos.x, pos.y],
        };
        setCurrentLine(newLine);

        const points = newLine.points.slice();
        if (points.length > 4) {
          const curve = new Bezier(points);
          const curvePoints = curve
            .getLUT(100)
            .map((point) => [point.x, point.y])
            .flat();
          newLine.curvePoints = curvePoints;
        } else {
          newLine.curvePoints = points;
        }
      } else {
        const updatedLine = {
          ...currentLine,
          points: [currentLine.points[0], currentLine.points[1], pos.x, pos.y],
        };
        setCurrentLine(updatedLine);
      }
    }
  };

  const handleMouseUp = () => {
    if (!currentLine) return;

    if (isCurving) {
      const points = currentLine.points.slice();
      if (points.length > 4) {
        const curve = new Bezier(points);
        const curvePoints = curve
          .getLUT(100)
          .map((point) => [point.x, point.y])
          .flat();
        setLines([...lines, { points: curvePoints, isCurve: true }]);
      }
    } else {
      setLines([...lines, { ...currentLine, isCurve: false }]);
    }

    setInputValues([...inputValues, ""]);
    setInputDirections([...inputDirections, "top"]);
    setCurrentLine(null);
    setIsDrawing(false);
  };

  const toggleDrawingMode = () => {
    setIsCurving(!isCurving);
    setCurrentLine(null);
  };

  const renderInputBoxes = () => {
    return lines.map((line, index) => {
      // // Calculate the center of the curve or line
      // const canvas = canvasRef.current;
      // const context = canvas?.getContext("2d");

      const center = line.isCurve
        ? calculateCurveCenter(line.points)
        : calculateLineCenter(line.points);
      // const textWidth = context.measureText(inputValues[index]).width;
      const inputBoxWidth = 80; // Assuming a fixed width for the input box
      let leftPosition, topPosition;

      switch (inputDirections[index]) {
        case "right":
          leftPosition = center.x + 10;
          topPosition = center.y - inputBoxWidth / 2;
          break;
        case "left":
          leftPosition = center.x - inputBoxWidth - 10;
          topPosition = center.y - inputBoxWidth / 2;
          break;
        case "top":
          leftPosition = center.x - inputBoxWidth / 2;
          topPosition = center.y - 10 - inputBoxWidth;
          break;
        case "bottom":
          leftPosition = center.x - inputBoxWidth / 2;
          topPosition = center.y + 20; // Adjust the distance below the line
          break;
        default:
          leftPosition = center.x + 10;
          topPosition = center.y - inputBoxWidth / 2;
          break;
      }

      return (
        <div
          key={index}
          className="position-absolute"
          style={{
            left: `${leftPosition}px`,
            top: `${topPosition}px`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={inputValues[index]}
            onChange={(e) => handleInputChange(e, index)}
            className={`border rounded px-2 py-1 text-black ${
              inputValues[index] ? "border-blue-600" : "border-red-600"
            }`}
            style={{
              width: `${inputBoxWidth}px`,
              textAlign: "left",
              marginRight: inputDirections[index] === "right" ? "5px" : "0",
              marginLeft: inputDirections[index] === "left" ? "5px" : "0",
              marginTop: inputDirections[index] === "top" ? "5px" : "0",
              marginBottom: inputDirections[index] === "bottom" ? "5px" : "0",
            }}
          />
          {inputDirections[index] === "right" ? (
            <ChevronLeft
              size={20}
              className="cursor-pointer text-black"
              onClick={() => toggleInputDirection(index)}
            />
          ) : inputDirections[index] === "left" ? (
            <ChevronRight
              size={20}
              className="cursor-pointer text-black"
              onClick={() => toggleInputDirection(index)}
            />
          ) : inputDirections[index] === "top" ? (
            <ChevronDown
              size={20}
              className="cursor-pointer text-black"
              onClick={() => toggleInputDirection(index)}
            />
          ) : (
            <ChevronUp
              size={20}
              className="cursor-pointer text-black"
              onClick={() => toggleInputDirection(index)}
            />
          )}
        </div>
      );
    });
  };

  const calculateLineCenter = (points) => {
    if (!points || points.length < 4) {
      return { x: 0, y: 0 };
    }
    const midX = (points[0] + points[2]) / 2;
    const midY = (points[1] + points[3]) / 2;
    return { x: midX, y: midY };
  };
  const handleSave = (event, apiType) => {
    event.preventDefault();

    if (apiType === "alpha") {
      setLoading(true);
    } else {
      // setLoadingBeta(true);
    }

    if (inputValues.some((value) => value.trim() === "")) {
      setShowMessage(true);
      setLoading(false);
      // setLoadingBeta(false);
      return;
    }

    if (!name.trim()) {
      setLoading(false);
      // setLoadingBeta(false);
      Swal.fire({
        title: "Error",
        text: "Project Name cannot be empty!",
        icon: "error",
      });
      return;
    }
    // if (!user_plan.trim()) {
    //   setLoading(false);
    //   // setLoadingBeta(false);
    //   Swal.fire({
    //     title: "Error",
    //     text: "Must Select The SubStructure Plan...",
    //     icon: "error",
    //   });
    //   return;
    // }
    setShowMessage(false);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const img = imageRef.current;

    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      lines?.forEach((line, index) => {
        context.beginPath();

        if (line?.isCurve) {
          const curve = new Bezier(line?.points);
          const curvePoints = curve.getLUT(100);
          context.moveTo(curvePoints[0].x, curvePoints[0].y);
          curvePoints.forEach((point, i) => {
            if (i > 0) {
              context.lineTo(point.x, point.y);
            }
          });
        } else {
          context.moveTo(line?.points[0], line?.points[1]);
          context.lineTo(line?.points[2], line?.points[3]);
        }

        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.stroke();

        const center = line.isCurve
          ? calculateCurveCenter(line.points)
          : calculateLineCenter(line.points);
        const textWidth = context.measureText(inputValues[index]).width;
        let textX, textY;

        switch (inputDirections[index]) {
          case "right":
            textX = center.x + 10;
            textY = center.y;
            break;
          case "left":
            textX = center.x - textWidth - 10;
            textY = center.y;
            break;
          case "top":
            textX = center.x - textWidth / 2;
            textY = center.y - 10;
            break;
          case "bottom":
            textX = center.x - textWidth / 2;
            textY = center.y + 20;
            break;
          default:
            textX = center.x + 10;
            textY = center.y;
            break;
        }

        context.fillStyle = "red";
        context.font = "700 18px Arial";
        context.fillText(inputValues[index], textX, textY);
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Failed to convert canvas to blob");
          return;
        }
        //       const imageUrl = URL.createObjectURL(blob);
        // setImageSrc(imageUrl);
        const formData = new FormData();
        formData.append("image", blob, "image.png");
        formData.append("project_name", name);
        formData.append("plans", user_plan);
        if (apiType === "alpha") {
          formData.append("Model", "alpha");
        } else if (apiType === "beta") {
          formData.append("Model", "beta");
        }
        if (user_prompt !== "") {
          formData.append("user_prompt", user_prompt);
        }

        const url =
          apiType === "alpha" ? "Alfa_CostEstimate/" : "Beta_CostEstimate/";
        axios
          .post(`${BaseUrl.baseurlImage}${url}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const result = JSON.parse(response?.data?.estimate);
            console.log(result, response?.data, "resulte--->");
            if (result?.analysis) {
              Navigate("/result-drawing", {
                state: { result, data: response?.data },
              });
            } else if (result) {
              Navigate("/result-drawing", {
                state: { result, data: response?.data },
              });
            }
            setLoading(false);
            // setLoadingBeta(false);
          })
          .catch((error) => {
            setLoading(false);
            // setLoadingBeta(false);
            Swal.fire({
              title: error.response.data.detail || error.response.data.message,
              icon: "error",
            });
          });
      }, "image/png");
    };

    if (img.complete) {
      img.onload();
    }
  };

  const handleDownload = () => {
    if (inputValues.some((value) => value.trim() === "")) {
      setShowMessage(true);
      return;
    }
    setShowMessage(false);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    context.drawImage(
      imageRef.current,
      0,
      0,
      imageRef.current.width,
      imageRef.current.height
    ); // Use custom width and height
    lines.forEach((line, index) => {
      context.beginPath();

      if (line.isCurve) {
        const curve = new Bezier(line.points);
        const curvePoints = curve.getLUT(100);
        context.moveTo(curvePoints[0].x, curvePoints[0].y);
        curvePoints.forEach((point, i) => {
          if (i > 0) {
            context.lineTo(point.x, point.y);
          }
        });
      } else {
        context.moveTo(line.points[0], line.points[1]);
        context.lineTo(line.points[2], line.points[3]);
      }

      context.strokeStyle = "red";
      context.lineWidth = 2;
      context.stroke();

      // Calculate the center of the curve or line
      const center = line.isCurve
        ? calculateCurveCenter(line.points)
        : calculateLineCenter(line.points);
      const textWidth = context.measureText(inputValues[index]).width;
      let textX, textY;

      switch (inputDirections[index]) {
        case "right":
          textX = center.x + 10;
          textY = center.y;
          break;
        case "left":
          textX = center.x - textWidth - 50;
          textY = center.y;
          break;
        case "top":
          textX = center.x - textWidth / 2;
          textY = center.y - 20;
          break;
        case "bottom":
          textX = center.x - textWidth / 2;
          textY = center.y + 30; // Adjust the distance below the line
          break;
        default:
          textX = center.x + 10;
          textY = center.y;
          break;
      }

      context.fillStyle = "red";
      context.font = "700 18px Arial";
      context.fillText(inputValues[index], textX, textY);
    });

    const uri = canvas.toDataURL("image/png");
    // console.log("canvas ==> ", canvas, uri);
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    link.click();
    // };
  };

  const calculateCurveCenter = (points) => {
    const curve = new Bezier(points);
    const curvePoints = curve.getLUT(100); // Get 100 points along the curve
    const midpoint = Math.floor(curvePoints.length / 2);
    return { x: curvePoints[midpoint].x, y: curvePoints[midpoint].y };
  };

  const handleDeleteLastLine = () => {
    if (lines.length > 0) {
      const lastLineIndex = lines.length - 1;
      const lastLine = lines[lastLineIndex];

      const newLines = lines.slice(0, lastLineIndex);
      const newInputValues = inputValues.slice(0, lastLineIndex);
      const newInputDirections = inputDirections.slice(0, lastLineIndex);

      setDeletedLines([
        ...deletedLines,
        {
          line: lastLine,
          value: inputValues[lastLineIndex],
          direction: inputDirections[lastLineIndex],
        },
      ]);
      setLines(newLines);
      setInputValues(newInputValues);
      setInputDirections(newInputDirections);
    }
  };

  const handleUndoDelete = () => {
    if (deletedLines.length > 0) {
      const restoredLine = deletedLines[deletedLines.length - 1];
      const newDeletedLines = deletedLines.slice(0, -1);

      setLines([...lines, restoredLine.line]);
      setInputValues([...inputValues, restoredLine.value]);
      setInputDirections([...inputDirections, restoredLine.direction]);
      setDeletedLines(newDeletedLines);
    }
  };
  useEffect(() => {
    console.log("selectedId ==> ", selectedId);
    if (selectedId !== null) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        trRef.current.nodes([selectedNode]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);
  console.log(user_prompt, "user_prompt");
  return (
    <>
    {loading&&<Loader/>}
      <div className="container">
        <div className="bg-white rounded py-3 p-md-3">
          {isCrop && (
            <Link
              type="button"
              className="btn btn-white d-flex align-items-center"
              to={"/new-project"}
            >
              <i className="fa fa-angle-left" style={{ fontSize: "25px" }}></i>
              &nbsp; <span>Back</span>
            </Link>
          )}
          {!isCrop && (
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center"
              onClick={handleBack}
            >
              <i className="fa fa-angle-left" style={{ fontSize: "25px" }}></i>
              &nbsp;
            </button>
          )}
          <div className="py-3 p-md-0 overflow-hidden">
            {isCrop && (
              <>
                <h3 className="text-primary fw-bold text-capitalize mt-0 mb-0 pb-2 col-lg-12 text-center">
                  Cost Drawing
                </h3>
                <div className="d-flex justify-content-center">
                  <div className="form-floating m-3 col-lg-6">
                    <input
                      type="text"
                      className="form-control border border-secondary"
                      name="user_prompt"
                      id="Project Name"
                      placeholder="enter Project Name"
                      required=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="Project Name"
                      className="form-label text-secondary "
                    >
                      Project Name:
                    </label>
                  </div>
                </div>
                {isCrop &&(
                <div
                  className="d-flex justify-content-center mb-4"
                  onDragOver={(e) => e?.preventDefault()} // Prevent default drag behavior
                  onDrop={(e) => {
                    e?.preventDefault();
                    // const files = e.dataTransfer.files;
                    onChange(e);
                    setLines([]);
                    setIsCropImage(true); // Trigger the same onChange function
                  }}
                >
                  <div className="col-lg-6 py-3">
                    <div class="container">
                      <div class="file-upload-wrapper">
                        <label class="file-upload-box mb-0">
                          <input
                            ref={inputRef}
                            id="file_input"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => onChange(e)} // Handle file select
                          />
                          <div class="upload-content">
                            <i class="fas fa-cloud-upload-alt upload-icon"></i>
                            <h5 class="mb-2" onClick={onUpload}>Drag & Drop your picture here</h5>
                            <p class="text-muted mb-0">or click to browse</p>
                          </div>
                        </label>
                      </div>
                    </div>
                    {/* <button
                      className={`btn breadcrumb_btn2 text-capitalize fw-bold d-flex align-items-center justify-content-center`}
                      style={{
                        padding: "100px 30px",
                        fontSize: "18px",
                        borderRadius: "50%",
                        letterSpacing: "0.5px",
                        transition: "0.5s",
                      }}
                      onClick={onUpload} // Handle button click
                      type="button"
                    >
                      <i className="fas fa-upload me-2"></i> Drop or Upload
                      Image
                    </button>
                    <input
                      ref={inputRef}
                      id="file_input"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => onChange(e)} // Handle file select
                    /> */}
                  </div>
                </div>
                )}
              </>
            )}
            <div className="d-grid gap-4 py-2 my-5">
              {showMessage && (
                <div className="text-center mt-2 text-danger">
                  Please fill all input fields before proceeding.
                </div>
              )}
              {!isCrop && image && (
                <>
                  <div className="form-group mx-3">
                    <input
                      type="text"
                      className="form-control border-secondary"
                      name="user_prompt"
                      id="For Additional Information:"
                      placeholder="Enter For Additional Information:"
                      required
                      value={user_prompt}
                      onChange={(e) => setuser_prompt(e.target.value)}
                    />
                  </div>
                  <div className="form-group mx-3">
                    <select
                      class="form-select"
                      aria-label="Bronze"
                      value={user_plan}
                      onChange={(e) => setuser_plan(e.target.value)}
                    >
                      <option selected value="">
                        Select the SubStructure Plan...
                      </option>
                      <option value="bronze">Bronze</option>
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                    </select>
                  </div>
                  <div className="position-relative bg-light d-flex flex-column align-items-center justify-center">
                    <div
                      className="position-relative"
                      style={{ width: "100%" }}
                      id="canvasWrapper"
                    >
                      <img
                        ref={imageRef}
                        src={croppedImage}
                        alt="Cropped"
                        className="img-fluid"
                        style={{ width: "100%", height: "600px" }}
                      />
                      <Stage
                        ref={stageRef}
                        width={resmobile ? window.innerWidth : 1170}
                        height={600}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchMove={handleMouseMove}
                        onTouchEnd={handleMouseUp}
                        className="position-absolute top-0 start-0 w-100"
                        style={{ position: "absolute", top: "0px" }}
                      >
                        <Layer>
                          {croppedImage ? null : (
                            <Image
                              image={imageRef.current}
                              className="img-preview"
                              width={resmobile ? window.innerWidth : 1170}
                              height={600}
                            />
                          )}
                          {lines.map((line, i) =>
                            line.isCurve ? (
                              <Line
                                key={i}
                                id={line.id}
                                points={line.points}
                                stroke="red"
                                strokeWidth={2}
                                onClick={() => setSelectedId(line.id)}
                              />
                            ) : (
                              <Line
                                key={i}
                                points={line.points.flat()}
                                stroke="red"
                                strokeWidth={2}
                                draggable
                                onDragEnd={(e) => {
                                  const updatedPoints = e.target.points();
                                  const newPoints = [];
                                  for (
                                    let i = 0;
                                    i < updatedPoints.length;
                                    i += 2
                                  ) {
                                    newPoints.push([
                                      updatedPoints[i],
                                      updatedPoints[i + 1],
                                    ]);
                                  }
                                  // adjustLineDirection(i, newPoints);
                                }}
                              />
                            )
                          )}
                          {currentLine &&
                            (isCurving ? (
                              <Line
                                points={currentLine.points}
                                stroke="red"
                                strokeWidth={2}
                                tension={0.5}
                                lineCap="round"
                              />
                            ) : (
                              <Line
                                points={currentLine.points}
                                stroke="red"
                                strokeWidth={2}
                                tension={0.5}
                                lineCap="round"
                              />
                            ))}
                          <Transformer ref={trRef} />
                        </Layer>
                      </Stage>
                      <canvas
                        ref={canvasRef}
                        width={resmobile ? window.innerWidth : 1170}
                        className=""
                        height={600}
                        style={{
                          display: "none",
                          background: "white",
                        }}
                      />
                      {renderInputBoxes()}
                    </div>
                  </div>
                  <br />
                  <br />
                  <button
                    onClick={toggleDrawingMode}
                    className="btn btn-link text-dark"
                  >
                    {isCurving ? "Draw Straight Line" : "Draw Curve"}
                  </button>
                  <div className="d-flex flex-wrap gap-2 justify-content-center mt-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary text-white btnhover"
                      onClick={() => handleDeleteLastLine()}
                    >
                      <FiCornerUpLeft className="mr-2 iconhover text-danger" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary text-white btnhover"
                      onClick={() => handleUndoDelete()}
                    >
                      <FiCornerUpRight className="mr-2 iconhover text-success" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary text-white btnhover"
                      onClick={() => handleDownload()}
                    >
                      <FontAwesomeIcon
                        icon={faDownload}
                        className="mr-2 iconhover text-success"
                      />
                    </button>
                  </div>
                </>
              )}
              {!isCrop && image && (
                <>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-primary w-48"
                      type="button"
                      onClick={(e) => handleSave(e, "alpha")}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          Creating...
                        </>
                      ) : (
                        "Generate Cost Estimate"
                      )}
                    </button>
                    {/*<button
                      className="btn btn-primary w-48"
                      type="button"
                      onClick={(e) => handleSave(e, "beta")}
                      disabled={loadingBeta}
                    >
                      {loadingBeta ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          Creating...
                        </>
                      ) : (
                        "Beta Cost Estimate"
                      )}
                    </button>*/}
                  </div>
                </>
              )}
              {isCropImage && (
                <>
                  <div className="d-grid gap-4">
                    <div className="col-md-12">
                      <Cropper
                        style={{ width: "100%", minHeight: 600 }}
                        zoomTo={0.5}
                        width={"100%"}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                          setCropper(instance);
                        }}
                        guides={true}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={getimgdata}
                    >
                      Crop
                    </button>
                  </div>
                </>
              )}
            </div>
            {console.log(estimateData, "API Response:data")}
            <div className="p-6">
              {estimateData?.data?.map((item, index) => (
                <div key={index} className="bg-white p-4">
                  <h2 className="font-weight-bold text-dark">
                    <strong>Name:</strong>{" "}
                    <span className="font-weight-normal text-muted">
                      {item?.name}
                    </span>
                  </h2>
                  {item?.dimension && (
                    <p>
                      <strong>Dimension:</strong> <span>{item?.dimension}</span>
                    </p>
                  )}
                  <p>
                    <strong>Cost:</strong> <span>{item?.cost}</span>
                  </p>
                  <p>
                    <strong>Price:</strong> <span>{item?.price}</span>
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    <span>{item?.description}</span>
                  </p>
                  {item?.id && (
                    <button
                      className="btn btn-link text-danger"
                      // onClick={() => handleDelete(item?.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CostDrawing;
