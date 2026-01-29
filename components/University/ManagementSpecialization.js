import React from "react";

const ManagementSpecialization = ({ university }) => {
  return (
    <div id="UniversityManagementSpecialization" style={{ padding: "60px" }}>
      <div>
        <h5>
          Management Specialization Of{" "}
          <span style={{ color: "purple" }}> {university?.title}</span>{" "}
        </h5>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="pt--20 col-12 d-flex text-justify justify-content-center" >
          <div className="col-lg-4 col-md-12 col-12">
            <ul className="rbt-list-style-1">
              {university?.Courses?.filter(
                (filter) => filter?.Degree_Type === "Masters Degree"
              )?.map((data, index) =>
                data?.Specialization?.filter(
                  (type) =>
                    type?.TypeOfSpecializations === "Core Specializations"
                )?.map((mba, Mbaindex) => (
                  <li key={`${index}-${Mbaindex}`}>
                    <i className="feather-check"></i> {mba?.SpecializationName}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 col-12">
            <ul className="rbt-list-style-1">
              {university?.Courses?.filter(
                (filter) => filter?.Degree_Type === "Masters Degree"
              )?.map((data, index) =>
                data?.Specialization?.filter(
                  (type) =>
                    type?.TypeOfSpecializations ===
                    "Industry-Specific Specializations"
                )?.map((mba, Mbaindex) => (
                  <li key={`${index}-${Mbaindex}`}>
                    <i className="feather-check"></i> {mba?.SpecializationName}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 col-12">
            <ul className="rbt-list-style-1">
              {university?.Courses?.filter(
                (filter) => filter?.Degree_Type === "Masters Degree"
              )?.map((data, index) =>
                data?.Specialization?.filter(
                  (type) =>
                    type?.TypeOfSpecializations ===
                    "Emerging & Niche Specializations"
                )?.map((mba, Mbaindex) => (
                  <li key={`${index}-${Mbaindex}`}>
                    <i className="feather-check"></i> {mba?.SpecializationName}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementSpecialization;
