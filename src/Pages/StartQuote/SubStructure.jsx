import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseUrl from "../../Auth/BaseUrl";

const SubStructureComponent = ({
  setSelectSubStructure,
  setSubStructureCost,
  HideMarkup,
  loading2,
}) => {
  const [subStructure, setSubStructure] = useState([]);
  const [subStructureFilter, setSubStructureFilter] = useState([]);
  const [subStructureCategorySet, setSubStructureCategorySet] = useState([]);
  const [subStructureCategoryName, setSubStructureCategoryName] = useState([]);

  const token = localStorage.getItem("token");

  const fetchSubStructureData = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl.CostImage}/api/substructure/fetch_substructure_data`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubStructure(response?.data || []);
    } catch (error) {
      console.error("Error fetching SubStructures:", error);
    }
  };

  useEffect(() => {
    fetchSubStructureData();
    // eslint-disable-next-line
  }, []);

  const handleSelect = (event) => {
    const selectedSubStructure = event.target.value;
    const filteredSubStructure = subStructure.find(
      (item) => item?.name === selectedSubStructure
    );
    if (filteredSubStructure) {
      setSubStructureFilter(filteredSubStructure?.substructure_sizes || []);
      console.log(filteredSubStructure, "filteredSubStructure--->");
    }
  };

  const handleSelectSubStructureCategorySet = (event) => {
    const selectedCategorySet = event.target.value;
    const filteredCategorySet = subStructureFilter.find(
      (item) => item?.name === selectedCategorySet
    );
    if (filteredCategorySet) {
      setSubStructureCategorySet(
        filteredCategorySet?.substructure_rankings || []
      );
      console.log(filteredCategorySet, "filteredCategorySet--->");
    }
  };

  const handleSelectSubStructureName = (event) => {
    const selectedSubStructureName = event.target.value;
    const filteredCategorySet = subStructureCategorySet.filter(
      (item) => item.id.toString() === selectedSubStructureName
    );
    setSubStructureCategoryName(filteredCategorySet);
  };

  console.log(
    subStructureCategoryName,
    "filteredCategorySet?.ranking_data--->"
  );
  return (
    <div
      className={loading2 ? "row" : "mb-3 row mt-2"}
      style={{ position: "relative" }}
    >
      {/* First Select */}
      <div
        className={`col-md-${
          subStructureFilter.length > 0 && subStructureCategorySet.length > 0
            ? 4
            : subStructureFilter.length > 0
            ? 6
            : 12
        }`}
      >
        <select className="form-select" onChange={handleSelect} defaultValue="">
          <option value="" disabled>
            Select a SubStructure
          </option>
          {subStructure.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div
        className="text-end rounded-circle w-auto"
        style={{ position: "absolute", right: "-30px", bottom: "20px" }}
      >
        <button
          className={`btn mb-3 w-auto mx-2 btn-danger rounded-circle`}
          onClick={() => {
            setSelectSubStructure(false);
            setSubStructure([]);
            setSubStructureFilter([]);
            setSubStructureCategorySet([]);
            setSubStructureCategoryName([]);
            setSubStructureCost(0);
          }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      {/* Second Select */}
      {subStructureFilter.length > 0 && (
        <div className={`col-md-${subStructureCategorySet.length > 0 ? 4 : 6}`}>
          <select
            className="form-select"
            onChange={handleSelectSubStructureCategorySet}
            defaultValue=""
          >
            <option value="" disabled>
              Select a Size
            </option>
            {subStructureFilter.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Third Select */}
      {subStructureCategorySet.length > 0 && (
        <div className="col-md-4">
          <select
            className="form-select"
            onChange={handleSelectSubStructureName}
            defaultValue=""
          >
            <option value="" disabled>
              Select a Plan
            </option>
            {subStructureCategorySet.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Table to Display Selected SubStructure Category Details */}
      {subStructureCategoryName.length > 0 &&
        subStructureCategoryName.map((item) => (
          <div key={item.id} className="col-md-12 mt-2">
            <table className={loading2 ? "table m-0" : "table"}>
              <thead>
                <tr>
                  <th style={{ width: "300px" }}>Name</th>
                  <th style={{ width: "300px" }}>Cost per Sheet</th>
                  <th style={{ width: "300px" }}>Quantity</th>
                  <th style={{ width: "300px" }}>CNC Time</th>
                  <th style={{ width: "300px" }}>Workshop Labour</th>
                  <th style={{ width: "300px" }}>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {item?.ranking_data?.map((rankItem) => (
                  <tr key={rankItem.id}>
                    {setSubStructureCost(rankItem?.Total_cost)}
                    <td>{rankItem?.name || ""}</td>
                    <td>{rankItem?.Cost_per_sheet || ""}</td>
                    <td>{rankItem?.Quantity || ""}</td>
                    <td>{rankItem?.CNC_time || ""}</td>
                    <td>{rankItem?.Workshop_labour || ""}</td>
                    <td>{rankItem?.Total_cost || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default SubStructureComponent;
