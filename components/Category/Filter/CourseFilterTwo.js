import React, { useState } from "react";

const normalizeString = (str) =>
  typeof str === "string" ? str.toLowerCase() : "";

const CourseFilterTwo = ({
  filters,
  onFilterChange,
  universities,
  QueryData,
}) => {
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);

  const degreeTypesOrder = ["Masters", "Bachelors"];

  const OrderGen = [
    "Masters",
    "Bachelors",
    "PG Diploma",
    "UG Diploma",
    "PG Certificate",
  ];

  const searchInputStyle = {
    width: "100%",
    height: "35px",
    padding: "0px 10px 0px 10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const getCourses = () =>
    universities?.flatMap((uni) => uni?.courses || []) || [];

  const modeLength = (value) =>
    getCourses().filter(
      (course) =>
        normalizeString(course?.course_type) === normalizeString(value)
    ).length;

  const degreeTypesLength = (value) =>
    getCourses().filter(
      (course) =>
        normalizeString(course?.degree_type) === normalizeString(value)
    ).length;

  const courseLength = (value) =>
    getCourses().filter(
      (course) => normalizeString(course?.shortName) === normalizeString(value)
    ).length;

  const specializationLength = (value) => {
    return getCourses()
      .flatMap((course) => course?.specializations?.specializationList || [])
      .filter(
        (spec) =>
          normalizeString(spec?.specialization_name) === normalizeString(value)
      ).length;
  };

  const uniqueDegreeTypes = [
    ...new Set(
      getCourses()
        .filter((course) => course?.degree_type)
        .sort((a, b) => {
          const indexA = OrderGen.indexOf(a.degree_type);
          const indexB = OrderGen.indexOf(b.degree_type);
          return (
            (indexA === -1 ? Infinity : indexA) -
            (indexB === -1 ? Infinity : indexB)
          );
        })
        .map((course) => course?.degree_type)
    ),
  ];

  const uniqueUniversityMode = [
    ...new Set(
      universities
        .filter((fil) => fil?.mode !== "F-Tell")
        .map((uni) => uni?.mode)
    ),
  ];

  const uniqueAllUniversity = [
    ...new Set(universities.map((uni) => uni?.title).filter(Boolean)),
  ];

  const uniqueAllCourses = [
    ...new Map(
      getCourses()
        .filter(
          (course) =>
            (course?.shortName || course?.course_name) &&
            (course.degree_type === "Masters" ||
              course.degree_type === "Bachelors")
        )
        .sort((a, b) => {
          const indexA = OrderGen.indexOf(a.degree_type);
          const indexB = OrderGen.indexOf(b.degree_type);
          return (
            (indexA === -1 ? Infinity : indexA) -
            (indexB === -1 ? Infinity : indexB)
          );
        })
        .map((course) => [
          course.shortName || course.course_name,
          {
            shortName: course.shortName,
            name: course?.course_name || course?.courseName,
            degree_type: course.degree_type,
          },
        ])
    ).values(),
  ];

  const uniqueAllDiploma = [
    ...new Map(
      getCourses()
        .filter(
          (course) =>
            (course?.shortName || course?.course_name) &&
            (course.degree_type === "PG Diploma" ||
              course.degree_type === "UG Diploma")
        )
        .sort((a, b) => {
          const indexA = OrderGen.indexOf(a.degree_type);
          const indexB = OrderGen.indexOf(b.degree_type);
          return (
            (indexA === -1 ? Infinity : indexA) -
            (indexB === -1 ? Infinity : indexB)
          );
        })
        .map((course) => [
          course.shortName || course.course_name,
          {
            shortName: course.shortName,
            name: course.course_name || course?.courseName,
            degree_type: course.degree_type,
          },
        ])
    ).values(),
  ];

  const uniqueAllCertification = [
    ...new Map(
      getCourses()
        .filter(
          (course) =>
            (course?.shortName || course?.course_name) &&
            (course.degree_type === "PG Certification" ||
              course.degree_type === "UG Certification")
        )
        .sort((a, b) => {
          const indexA = OrderGen.indexOf(a.degree_type);
          const indexB = OrderGen.indexOf(b.degree_type);
          return (
            (indexA === -1 ? Infinity : indexA) -
            (indexB === -1 ? Infinity : indexB)
          );
        })
        .map((course) => [
          course.shortName || course.course_name,
          {
            shortName: course.shortName,
            name: course.course_name || course?.courseName,
            degree_type: course.degree_type,
          },
        ])
    ).values(),
  ];

  const uniqueAllCoursesSpecializations = [
    ...new Set(
      getCourses()
        .flatMap((course) => course?.specializations?.specializationList || [])
        .map((spec) => spec?.specialization_name)
        .filter(Boolean)
    ),
  ];

  // Local search states
  const [searchMode, setSearchMode] = useState("");
  const [searchDegree, setSearchDegree] = useState("");
  const [searchUniversity, setSearchUniversity] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [searchDiploma, setSearchDiploma] = useState("");
  const [searchCertificate, setSearchCertificate] = useState("");
  const [searchSpecialization, setSearchSpecialization] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // Helper to flatten object values into a searchable string
  const objectToSearchString = (obj) => {
    if (!obj) return "";
    let result = "";

    for (const key in obj) {
      const value = obj[key];
      if (value && typeof value === "object") {
        result += " " + objectToSearchString(value); // recursive for nested objects
      } else if (value) {
        result += " " + value.toString();
      }
    }

    return result.toLowerCase(); // normalize for search
  };

  return (
    <div className="col-lg-12">
      <div
        className="rbt-sidebar-widget-wrapper filter-top-2 mt--60"
        style={{
          maxHeight: isOpen ? "100%" : "540px",
          overflow: "hidden",
          transition: "max-height 0.5s ease in-out",
          marginTop: "10px",
        }}
      >
        <div className="row g-5">
          {/* Mode Filter */}
          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="rbt-single-widget rbt-widget-instructor">
              <div className="inner">
                <h4 className="rbt-widget-title-2">Mode</h4>
                <input
                  type="text"
                  placeholder="Search Mode..."
                  value={searchMode}
                  onChange={(e) => setSearchMode(e.target.value)}
                  style={searchInputStyle}
                />
                <ul className="rbt-sidebar-list-wrapper instructor-list-check">
                  <li className="rbt-check-group">
                    <div className="mb-3 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!filters?.mode}
                          onChange={() => onFilterChange("mode", "", false)}
                          className="accent-red-600"
                        />
                        <span className="py-1 px-4 rbt-btn2">Clear Mode</span>
                      </label>
                    </div>
                    {uniqueUniversityMode
                      .filter((value) =>
                        value.toLowerCase().includes(searchMode.toLowerCase())
                      )
                      .map((levelOption) => {
                        const lowerValue = normalizeString(levelOption);
                        const checkboxId = `mode-${lowerValue}`;
                        return (
                          <div
                            key={checkboxId}
                            className="flex items-center gap-2"
                          >
                            <input
                              id={checkboxId}
                              type="checkbox"
                              checked={
                                normalizeString(filters?.mode) === lowerValue
                              }
                              onChange={() =>
                                onFilterChange("mode", lowerValue, true)
                              }
                              className="accent-blue-600"
                            />
                            <label htmlFor={checkboxId} className="text-sm">
                              {levelOption} Mode
                              {/* <span
                              className="fs-4 py-1 px-3 my-2"
                              style={{
                                background: "#ebebeb",
                                borderRadius: "5px",
                              }}
                            >
                              {modeLength(levelOption)}
                            </span> */}
                            </label>
                          </div>
                        );
                      })}
                  </li>
                </ul>
              </div>

              <div
                style={{
                  marginTop: "20px",
                }}
                className="inner"
              >
                <h4 className="rbt-widget-title-2">Degree</h4>
                <input
                  type="text"
                  placeholder="Search Degree..."
                  value={searchDegree}
                  onChange={(e) => setSearchDegree(e.target.value)}
                  style={searchInputStyle}
                />
                <ul className="rbt-sidebar-list-wrapper lavels-list-check">
                  <li className="rbt-check-group">
                    <div className="mb-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!filters?.level}
                          onChange={() => onFilterChange("level", "", false)}
                          className="accent-red-600"
                        />
                        <span className="py-2 px-4 rbt-btn2">Clear Degree</span>
                      </label>
                    </div>
                    {uniqueDegreeTypes
                      .filter((value) =>
                        value.toLowerCase().includes(searchDegree.toLowerCase())
                      )
                      .map((levelOption) => {
                        const lowerValue = normalizeString(levelOption);
                        const checkboxId = `level-${lowerValue}`;
                        return (
                          <div
                            key={checkboxId}
                            className="flex items-center gap-2"
                          >
                            <input
                              id={checkboxId}
                              type="checkbox"
                              checked={
                                normalizeString(filters?.level) === lowerValue
                              }
                              onChange={() =>
                                onFilterChange("level", levelOption, true)
                              }
                              className="accent-blue-600"
                            />
                            <label htmlFor={checkboxId} className="text-sm">
                              {levelOption === "Certification Course"
                                ? "UG Certification"
                                : levelOption === "Postgraduate Certificate"
                                  ? "PG Certification"
                                  : levelOption}
                              {/* <span
                              className="fs-4 py-1 px-3 my-2"
                              style={{
                                background: "#ebebeb",
                                borderRadius: "5px",
                              }}
                            >
                              {degreeTypesLength(levelOption)}
                            </span> */}
                            </label>
                          </div>
                        );
                      })}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* University Filter */}
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className={`rbt-single-widget rbt-widget-categories`}>
              <div className="inner">
                <h4 className="rbt-widget-title-2">University</h4>

                <input
                  type="text"
                  placeholder="Search University..."
                  value={searchUniversity}
                  onChange={(e) => setSearchUniversity(e.target.value)}
                  style={searchInputStyle}
                />
                {/* Clear filter checkbox */}
                {/* {filters?.university?.length > 0 && (
                )} */}
                <div className="mb-2 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => onFilterChange("university", [])}
                      className="accent-red-600"
                    />
                    <span className="py-2 px-4 rbt-btn2">Clear University</span>
                  </label>
                </div>

                <ul
                  style={{
                    maxHeight: "360px",
                    overflowY: "auto",
                    listStyle: "none",
                    padding: 0,
                    fontWeight: "normal",
                  }}
                  className="rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content"
                >
                  <li
                    className="rbt-check-group"
                    style={{ marginTop: show && "3px" }}
                  >
                    {uniqueAllUniversity
                      .filter((value) =>
                        value
                          .toLowerCase()
                          .includes(searchUniversity.toLowerCase())
                      )
                      .map((universityName) => {
                        const normalizedName = normalizeString(universityName);
                        const isChecked =
                          filters?.university?.includes(normalizedName);
                        const checkboxId = `university-${normalizedName}`;

                        const handleCheckboxChange = () => {
                          let updated = [...(filters.university || [])];

                          if (isChecked) {
                            updated = updated.filter(
                              (u) => u !== normalizedName
                            );
                          } else {
                            updated.push(normalizedName);
                          }

                          onFilterChange("university", updated);
                        };

                        return (
                          <div
                            key={checkboxId}
                            className="flex items-center gap-2"
                          >
                            <input
                              id={checkboxId}
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                              className="accent-blue-600"
                            />
                            <label htmlFor={checkboxId} className="text-sm">
                              {universityName}
                            </label>
                          </div>
                        );
                      })}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Course Filter */}
          <div className="col-lg-6 col-md-7 col-sm-6 col-12">
            <div className="rbt-single-widget rbt-widget-categories">
              <div className="inner">
                <h4 className="rbt-widget-title-2">Course</h4>

                <input
                  type="text"
                  placeholder="Search Course..."
                  value={searchCourse}
                  onChange={(e) => setSearchCourse(e.target.value)}
                  style={searchInputStyle}
                />

                {/* Clear Course */}
                <div className="mb-2 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters?.FilCourse?.length === 0}
                      onChange={() => onFilterChange("FilCourse", [])}
                      className="accent-red-600"
                    />
                    <span className="py-2 px-4 rbt-btn2">Clear Course</span>
                  </label>
                </div>

                <ul
                  style={{
                    maxHeight: "360px",
                    overflowY: "auto",
                    listStyle: "none",
                    padding: 0,
                  }}
                  className="rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content"
                >
                  <li className="rbt-check-group">
                    {uniqueAllCourses
                      .filter((course) => {
                        const searchStr = searchCourse.toLowerCase();
                        return objectToSearchString(course).includes(searchStr);
                      })
                      .map((course) => {
                        const displayValue = course.shortName;
                        const normalizedValue = normalizeString(displayValue);
                        const isChecked =
                          filters?.FilCourse?.includes(normalizedValue);

                        const checkboxId = `course-${normalizedValue}`;

                        const handleCheckboxChange = () => {
                          let updated = [...(filters.FilCourse || [])];

                          if (isChecked) {
                            updated = updated.filter(
                              (c) => c !== normalizedValue
                            );
                          } else {
                            updated.push(normalizedValue);
                          }

                          onFilterChange("FilCourse", updated);
                        };

                        return (
                          <div
                            key={checkboxId}
                            className="flex items-center gap-2"
                          >
                            <input
                              id={checkboxId}
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                              className="accent-blue-600"
                            />
                            <label htmlFor={checkboxId} className="text-sm">
                              {course.shortName} – {course.name}
                            </label>
                          </div>
                        );
                      })}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Diploma Filter */}
          <div className="col-lg-6 col-md-7 col-sm-6 col-12">
            <div className={`rbt-single-widget rbt-widget-categories  `}>
              <div className="inner">
                <h4 className="rbt-widget-title-2">Diploma</h4>
                <input
                  type="text"
                  placeholder="Search Diploma..."
                  value={searchDiploma}
                  onChange={(e) => setSearchDiploma(e.target.value)}
                  style={searchInputStyle}
                />
                <div className="mb-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      // checked={!filters?.FilCourse}
                      checked={(filters?.FilCourse || []).length === 0}

                      onChange={() => onFilterChange("FilCourse", [])}

                      // onChange={() => onFilterChange("FilCourse", "", false)}
                      className="accent-red-600"
                    />
                    <span className="py-2 px-4 rbt-btn2">Clear Diploma</span>
                  </label>
                </div>
                <ul
                  style={{
                    maxHeight: "250px",
                    overflowY: "auto",
                    listStyle: "none",
                    padding: 0,
                  }}
                  className="rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content"
                >
                  <li
                    className="rbt-check-group"
                    style={{ marginTop: show2 && "3px" }}
                  >
                    {uniqueAllDiploma
                      .filter((course) => {
                        const searchStr = searchDiploma.toLowerCase();
                        const courseStr = objectToSearchString(course); // flatten entire object
                        return courseStr.includes(searchStr);
                      })
                      .map((levelOption) => {
                        const displayValue = levelOption?.shortName;
                        const lowerValue = normalizeString(displayValue);
                        const checkboxId = `FilCourse-${lowerValue}`;
                        return (
                          <div
                            key={checkboxId}
                            className="flex items-center gap-2"
                          >
                            <input
                              id={checkboxId}
                              type="checkbox"
                              // checked={
                              //   normalizeString(filters?.FilCourse) ===
                              //   lowerValue
                              // }
                              checked={(filters?.FilCourse || []).includes(lowerValue)}

                              // onChange={() =>
                              //   onFilterChange(
                              //     "FilCourse",
                              //     levelOption.shortName,
                              //     true
                              //   )
                              // }
                              onChange={() => {
                                const normalized = normalizeString(levelOption.shortName);
                                let updated = [...(filters.FilCourse || [])];

                                if (updated.includes(normalized)) {
                                  updated = updated.filter(v => v !== normalized);
                                } else {
                                  updated.push(normalized);
                                }

                                onFilterChange("FilCourse", updated);
                              }}

                              className="accent-blue-600"
                            />
                            <label htmlFor={checkboxId} className="text-sm">
                              {levelOption.shortName} - {levelOption.name}
                            </label>
                          </div>
                        );
                      })}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certification Filter */}
          <div className="col-lg-6 col-md-7 col-sm-6 col-12">
            <div className={`rbt-single-widget rbt-widget-categories  `}>
              <div className="inner">
                <h4 className="rbt-widget-title-2">Certification</h4>
                <input
                  type="text"
                  placeholder="Search Course..."
                  value={searchCertificate}
                  onChange={(e) => setSearchCertificate(e.target.value)}
                  style={searchInputStyle}
                />
                <div className="mb-3">
                  <label className="flex items-center gap-2">
                    {/* <input
                      type="checkbox"
                      checked={!filters?.FilCourse}
                      onChange={() => onFilterChange("FilCourse", "", false)}
                      className="accent-red-600"
                    /> */}
                    <input
                      type="checkbox"
                      checked={(filters?.FilCourse || []).length === 0}
                      onChange={() => onFilterChange("FilCourse", [])}
                      className="accent-red-600"
                    />
                    <span className="py-2 px-4 rbt-btn2">
                      Clear Certification
                    </span>
                  </label>
                </div>
                <ul
                  style={{
                    maxHeight: "250px",
                    overflowY: "auto",
                    listStyle: "none",
                    padding: 0,
                  }}
                  className="rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content"
                >
                  <li
                    className="rbt-check-group"
                    style={{ marginTop: show2 && "3px" }}
                  >
                    {uniqueAllCertification
                      .filter((course) => {
                        const searchStr = searchCertificate.toLowerCase();
                        const courseStr = objectToSearchString(course); // flatten entire object
                        return courseStr.includes(searchStr);
                      })
                      .map((levelOption) => {
                        const displayValue = levelOption?.shortName;
                        const lowerValue = normalizeString(displayValue);
                        const checkboxId = `FilCourse-${lowerValue}`;
                        return (
                          <div
                            key={checkboxId}
                            className="flex items-center gap-2"
                          >
                            <input
                              id={checkboxId}
                              type="checkbox"
                              // checked={
                              //   normalizeString(filters?.FilCourse) ===
                              //   lowerValue
                              // }
                              checked={(filters?.FilCourse || []).includes(lowerValue)}

                              // onChange={() =>
                              //   onFilterChange(
                              //     "FilCourse",
                              //     levelOption.shortName,
                              //     true
                              //   )
                              // }

                              onChange={() => {
                                const normalized = normalizeString(levelOption.shortName);
                                let updated = [...(filters.FilCourse || [])];

                                if (updated.includes(normalized)) {
                                  updated = updated.filter(v => v !== normalized);
                                } else {
                                  updated.push(normalized);
                                }

                                onFilterChange("FilCourse", updated);
                              }}

                              className="accent-blue-600"
                            />
                            <label htmlFor={checkboxId} className="text-sm">
                              {levelOption.name}
                            </label>
                          </div>
                        );
                      })}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Specialization Filter */}
          <div className="col-lg-5 col-md-7 col-sm-6 col-12">
            <div className={`rbt-single-widget rbt-widget-instructor `}>
              <div className="inner">
                <h4 className="rbt-widget-title-2">Specializations</h4>
                <input
                  type="text"
                  placeholder="Search Specialization..."
                  value={searchSpecialization}
                  onChange={(e) => setSearchSpecialization(e.target.value)}
                  style={searchInputStyle}
                />
                <div className="mb-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!filters?.specialization}
                      onChange={() =>
                        onFilterChange("specialization", "", false)
                      }
                      className="accent-red-600"
                    />
                    <span className="py-2 px-4 rbt-btn2">
                      Clear Specialization
                    </span>
                  </label>
                </div>
                <ul
                  style={{
                    maxHeight: "250px",
                    overflowY: "auto",
                    listStyle: "none",
                    padding: 0,
                  }}
                  className="rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content"
                >
                  <li
                    className="rbt-check-group"
                    style={{ marginTop: show3 && "3px" }}
                  >
                    {uniqueAllCoursesSpecializations
                      .filter((value) =>
                        value
                          .toLowerCase()
                          .includes(searchSpecialization.toLowerCase())
                      )
                      .map((spec) => {
                        const lowerValue = normalizeString(spec);
                        const checkboxId = `specialization-${lowerValue}`;
                        return (
                          <div
                            key={checkboxId}
                            className="flex items-center gap-2"
                          >
                            <input
                              id={checkboxId}
                              type="checkbox"
                              checked={
                                normalizeString(filters?.specialization) ===
                                lowerValue
                              }
                              onChange={() =>
                                onFilterChange("specialization", spec, true)
                              }
                              className="accent-blue-600"
                            />
                            <label htmlFor={checkboxId} className="text-sm">
                              {spec}
                            </label>
                          </div>
                        );
                      })}
                  </li>
                </ul>
              </div>
              {/* <div
                className={`rbt-show-more-btn ${show3 ? "" : "active"}`}
                onClick={() => setShow3(!show3)}
              >
                {show3 ? "Show More" : "Show Less"}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <button
          style={{
            fontSize: "16px",
            fontWeight: 500,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #0070f3",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#0070f3",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0070f3";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.color = "#0070f3";
            e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
          }}
        >
          Show More Filters {isOpen ? "▲" : "▼"}
        </button>
      </div>
    </div>
  );
};

export default CourseFilterTwo;
