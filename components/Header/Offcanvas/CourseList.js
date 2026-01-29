"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Loader from "@/components/Common/Loader";
import { useAppContext } from "@/context/Context";
import { useScreenSize } from "@/hooks/screenSize";

const CourseList = ({ categoryItems, title, maxItems = 100 }) => {
  const { Courses, setCourses } = useAppContext();
  const router = useRouter();
  const screenSize = useScreenSize();
  const isSmallScreen = screenSize !== "lg";

  const [searchData, setSearchData] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounce search input
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(searchData.trim());
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchData]);

  // Filtered courses using memoization
  const filteredCourses = useMemo(() => {
    if (!debouncedSearch) return [];
    const searchTerm = debouncedSearch.toLowerCase();
    return categoryItems.filter((course) =>
      Object.values(course).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm)
      )
    );
  }, [debouncedSearch, categoryItems]);

  // Handle input change
  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  // Manual search trigger
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setDebouncedSearch(searchData.trim());
    setTimeout(() => setLoading(false), 500);
  };

  // Redirect to course detail page
  const handleExplore = (data, e) => {
    e.preventDefault();
    router.push(`/course/${data?.course_link}`);
    setTimeout(() => setCourses(true), 600);
  };

  // Navigate to filtered universities
  const handleViewUniversities = (data, e) => {
    e.preventDefault();
    if (!data) return;

    const { degree_type, shortName } = data;

    router.push({
      pathname: "/all-courses",
      query: {
        degree_type:
          degree_type === "Postgraduate Diploma"
            ? "pg diploma"
            : degree_type === "Undergraduate Diploma"
            ? "ug diploma"
            : degree_type === "Undergraduate Certificate"
            ? "ug certificate"
            : degree_type === "Postgraduate Certificate"
            ? "pg certificate"
            : degree_type?.toLowerCase() || "",
        shortName: shortName?.toLowerCase() || "",
      },
    });
  };

  // Determine which list to render
  const coursesToShow = debouncedSearch
    ? filteredCourses
    : categoryItems?.slice(0, maxItems);

  return (
    <div>
      <div className="child-inner ">
        <div className="row">
          <div className="col-lg-12">
            <form
              onSubmit={handleSearchSubmit}
              style={{ margin: "30px 0 20px 0" }}
              className="rbt-search-style-1"
            >
              <input
                type="text"
                placeholder="Search Courses"
                value={searchData}
                onChange={handleSearchChange}
              />
              <div>
                <button type="submit" className="search-btn">
                  <i className="feather-search" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {["Bachelor Course", "Master Course"].includes(title) && (
          <div className="col-lg-12" style={{ marginBottom: "10px" }}>
            {/* Ex : online, distance, f-tell etc... */}
          </div>
        )}

        <div className="col-lg-12">
          <div className="section-title">
            <h5
              className="rbt-title-style-3 m--0 p--0"
              style={{ fontSize: "18px" }}
            >
              {title}
            </h5>
          </div>
        </div>

        <div
          className="row pb--0 mt--0 mb--10 heightOverflowPadding"
          style={{ maxHeight: "310px" }}
        >
          {coursesToShow?.length > 0 &&
            coursesToShow.map((data, index) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 pb--15"
                key={index}
              >
                <div
                  className="rbt-card variation-01 rbt-hover-02 mt--10"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    // height: "30vh",
                    // minHeight: "22vh",
                    // maxHeight: "80vh",
                    background: "#fff",
                    padding: "0 12px 12px 12px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    boxShadow: "5px 6px 5px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="rbt-card-body m--0 pt--10"
                    style={{ flex: 1, overflow: "hidden" }}
                  >
                    <h5 className="rbt-card-title m--0 p--0">
                      <Link href={`${data?.course_link}`}>
                        {data?.shortName || "N/A"}
                      </Link>
                    </h5>
                    <h2
                      className="rbt-review"
                      style={{
                        flexWrap: "wrap",
                        minHeight: "20px",
                        textAlign: "left",
                      }}
                    >
                      <span>
                        {data?.course_name
                          ? data.course_name
                          : data.course_name || "Not Avilable"}
                      </span>
                    </h2>
                  </div>

                  {/* Bottom Buttons */}
                  <div
                    className="rbt-card-bottom"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "white",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        fontSize: "10px",
                        width: "90%",
                      }}
                    >
                      <button
                        className="rbt-btn7 bg-violet-opacity hover-icon-reverse"
                        onClick={(e) => handleViewUniversities(data, e)}
                      >
                        <span className="icon-reverse-wrapper">
                          <span className="btn-text">View Universities</span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                        </span>
                      </button>
                      <button
                        className="rbt-btn7 bg-coral-opacity hover-icon-reverse"
                        onClick={(e) => handleExplore(data, e)}
                      >
                        <span className="icon-reverse-wrapper">
                          <span className="btn-text">Explore</span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Conditional Empty State */}
          {debouncedSearch && filteredCourses?.length === 0 && (
            <div className="col-lg-12 text-center mt--20">
              <p>No courses found for "{debouncedSearch}"</p>
            </div>
          )}

          {!debouncedSearch && categoryItems?.length === 0 && (
            <div className="col-lg-12 text-center mt--20">
              <p>
                {title === "Doctorate/Ph.D."
                  ? "Doctorate/Ph.D Comming Soon"
                  : title + "Not Avaible"}
              </p>
            </div>
          )}

          {loading && (
            <div className="col-lg-12 text-center mt--20">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
