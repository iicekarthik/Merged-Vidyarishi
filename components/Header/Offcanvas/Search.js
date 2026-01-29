"use client";
import Link from "next/link";
import Image from "next/image";

import CourseData from "../../../data/course-details/courseData.json";

import CategoryData from "../../../data/elements/category.json";
import CategoryOne from "../../../public/images/nav/category-1.webp";
import CategoryNine from "../../../public/images/nav/category-9.webp";

import { useAppContext } from "@/context/Context";
import MenuData from "../../../data/MegaMenu";
import ElementsLayout from "../NavProps/ElementsLayout";
import SingleCategory from "../Category/CategoryProps/SingleCategory";
import { useEffect, useState } from "react";
import CourseList from "./CourseList";
import AllUniversities from "../../../data/vidya/University.json";
import AllCourses from "../../../data/vidya/VidyaCourses.json";

const Search = () => {
  const { search, Courses, setCourses } = useAppContext();

  const [ClickAbleCourse, setClickAbleCourse] = useState("Online Course");

  const HandleChangeCourse = (data) => {
    setClickAbleCourse(data);
  };

  const [OnlineCourses, setOnlineCourses] = useState(null);
  const [DistanceCourses, setDistanceCourses] = useState(null);
  const [BachelorCourses, setBachelorCourses] = useState(null);
  const [BachelorCoursesTwo, setBachelorCoursesTwo] = useState(null);
  const [AllBachelorCourses, setAllBachelorCourses] = useState(null);
  const [MasterCourses, setMasterCourses] = useState(null);
  const [MasterCoursesTwo, setMasterCoursesTwo] = useState(null);
  const [AllMasterCourses, setAllMasterCourses] = useState(null);
  const [UgDiplomaCourses, setUgDiplomaCourses] = useState(null);
  const [PgDiplomaCourses, setPgDiplomaCourses] = useState(null);
  const [UGCertificationCourses, setUGCertificationCourses] = useState(null);
  const [PGCertificationCourses, setPGCertificationCourses] = useState(null);
  const [DoctaratePhd, setDoctaratePhd] = useState(null);

  useEffect(() => {
    if (!AllCourses?.all_Courses || !Array.isArray(AllCourses?.all_Courses))
      return;

    const extractCourses = (
      filterFn = () => true,
      modeFilter = null,
      degreeLevelFilter = null,
      CourseNameFilter = null
    ) => {
      const degreeOrder = [
        "Masters",
        "Bachelors",
        "Postgraduate Diploma",
        "Undergraduate Diploma",
        "Postgraduate Certificate",
        "Undergraduate Certificate",
        "Undergraduate Certificate",
        "Doctorate/Ph.D.",
      ];

      return AllCourses?.all_Courses
        ?.filter((course) => {
          const matchesMode =
            !modeFilter ||
            (Array.isArray(modeFilter)
              ? modeFilter.includes(course.course_type)
              : course.course_type === modeFilter);

          const matchesDegreeLevel =
            !degreeLevelFilter || course.degree_type === degreeLevelFilter;

          const matchesCourseName =
            !CourseNameFilter ||
            (Array.isArray(CourseNameFilter)
              ? CourseNameFilter.includes(course.shortName)
              : course.shortName === CourseNameFilter);

          return (
            matchesMode &&
            matchesDegreeLevel &&
            matchesCourseName &&
            filterFn(course)
          );
        })
        .sort(
          (a, b) =>
            degreeOrder.indexOf(a.degree_type) -
            degreeOrder.indexOf(b.degree_type)
        );
    };

    // 🔹 Online Courses
    setOnlineCourses(extractCourses(() => true, ["Online"], null));

    // 🔹 Distance Courses
    setDistanceCourses(extractCourses(() => true, ["Distance"], null));

    // 🔹 Bachelors Degree Courses
    const bachelorsOnline = extractCourses(
      () => true,
      ["Online", "F-Tell"],
      "Bachelors"
    );
    const bachelorsDistance = extractCourses(
      () => true,
      ["Distance"],
      "Bachelors",
      ["BLIS"]
    );

    setBachelorCourses(bachelorsOnline);
    setBachelorCoursesTwo(bachelorsDistance);
    setAllBachelorCourses([...bachelorsOnline, ...bachelorsDistance]); // ✅ Fix applied

    // 🔹 Masters Degree Courses
    const mastersOnline = extractCourses(
      () => true,
      ["Online"],
      "Masters"
    );
    const mastersDistance = extractCourses(
      () => true,
      ["Distance"],
      "Masters",
      ["MLIS"]
    );

    setMasterCourses(mastersOnline);
    setMasterCoursesTwo(mastersDistance);
    setAllMasterCourses([...mastersOnline, ...mastersDistance]); // ✅ Fix applied

    // 🔹 Diploma Courses
    setUgDiplomaCourses(
      extractCourses(() => true, null, "Undergraduate Diploma")
    );
    setPgDiplomaCourses(
      extractCourses(() => true, null, "Postgraduate Diploma")
    );

    // 🔹 Certification Courses
    setUGCertificationCourses(
      extractCourses(() => true, null, "UG Certification")
    );
    setPGCertificationCourses(
      extractCourses(() => true, null, "PG Certification")
    );
    setDoctaratePhd(extractCourses(() => true, null, "Doctorate/Ph.D."));
  }, [AllCourses]);

  // console.log("OnlineCourses", OnlineCourses);

  return (
    <>
      <div className={`rbt-search-dropdown ${!search ? "active" : ""}`}>
        <div className="wrapper">
          <div className="row">
            <div className="col-lg-12">
              <form action="#">
                <input type="text" placeholder="What are you looking for?" />
                <div className="submit-btn">
                  <Link className="rbt-btn btn-gradient btn-md" href="#">
                    Search
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <div className="rbt-separator-mid">
            <hr className="rbt-separator m-0" />
          </div>

          <div className="row g-4 pt--30 pb--60">
            <div className="col-lg-12">
              <div className="section-title">
                <h5 className="rbt-title-style-2">Our Top Course</h5>
              </div>
            </div>

            {CourseData.courseDetails.slice(0, 4).map((data, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                <div className="rbt-card variation-01 rbt-hover">
                  <div className="rbt-card-img">
                    <a href={`/course-details/${data.id}`}>
                      <Image
                        src={data.courseImg}
                        width={186}
                        height={128}
                        alt="Card image"
                      />
                    </a>
                  </div>
                  <div className="rbt-card-body">
                    <h5 className="rbt-card-title">
                      <a href={`/course-details/${data.id}`}>
                        {data.courseTitle}
                      </a>
                    </h5>
                    <div className="rbt-review">
                      <div className="rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <span className="rating-count">
                        {" "}
                        ({data.review} Reviews)
                      </span>
                    </div>
                    <div className="rbt-card-bottom">
                      <div className="rbt-price">
                        <span className="current-price">$15</span>
                        <span className="off-price">$25</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`rbt-course-dropdown ${!Courses ? "active" : ""} `}>
        {/* <div>
          <div className="inner">
            <ul className="dropdown-parent-wrapper2">
              <SingleCategory
                // image={CategoryNine}
                title="Online Courses"
                isActive={false}
                CategoryData={CategoryData}
                CategoryNum={CategoryData.categoryItemOne}
              />
              <SingleCategory
                // image={CategoryOne}
                title="Distance Courses"
                isActive={false}
                CategoryData={CategoryData}
                CategoryNum={CategoryData.categoryItemTwo}
              />
              <SingleCategory
                // image={CategoryNine}
                title="Bachelors Courses"
                isActive={false}
                CategoryData={CategoryData}
                CategoryNum={CategoryData.categoryItemOne}
              />
              <SingleCategory
                // image={CategoryOne}
                title="Master Courses"
                isActive={false}
                CategoryData={CategoryData}
                CategoryNum={CategoryData.categoryItemTwo}
              />
              <SingleCategory
                // image={CategoryNine}
                title="Certificate Courses"
                isActive={false}
                CategoryData={CategoryData}
                CategoryNum={CategoryData.categoryItemTwo}
              />
            </ul>
          </div>
        </div> */}
        <div></div>

        {/* *************************** */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "0px 50px",
          }}
        >
          <div className="inner">
            <ul
              className="dropdown-parent-wrapper2"
              style={{ marginTop: "32px" }}
            >
              {[
                "Online Course",
                "Distance Course",
                "Master Course",
                "Bachelor Course",
                "PG Diploma Course",
                "UG Diploma Course",
                "PG Certifications",
                "UG Certifications",
                "Doctorate/Ph.D.",
              ].map((data, index) => (
                <SingleCategory
                  title={data}
                  isActive={false}
                  HandleChangeCourse={HandleChangeCourse}
                  ClickAbleCourse={ClickAbleCourse}
                />
              ))}
            </ul>
          </div>
          <div className="wrapper">
            <div>
              {ClickAbleCourse === "Online Course" ? (
                <CourseList
                  categoryItems={OnlineCourses}
                  title={"Online Course"}
                />
              ) : ClickAbleCourse === "Distance Course" ? (
                <CourseList
                  categoryItems={DistanceCourses}
                  title={"Distance Course"}
                />
              ) : ClickAbleCourse === "Master Course" ? (
                <CourseList
                  categoryItems={AllMasterCourses}
                  title={"Master Course"}
                />
              ) : ClickAbleCourse === "Bachelor Course" ? (
                <CourseList
                  categoryItems={AllBachelorCourses}
                  title={"Bachelor Course"}
                />
              ) : ClickAbleCourse === "UG Diploma Course" ? (
                <CourseList
                  categoryItems={UgDiplomaCourses}
                  title={"Under Graduation Diploma Course"}
                />
              ) : ClickAbleCourse === "PG Diploma Course" ? (
                <CourseList
                  categoryItems={PgDiplomaCourses}
                  title={"Post Graduation Diploma Course"}
                />
              ) : ClickAbleCourse === "UG Certifications" ? (
                <CourseList
                  categoryItems={UGCertificationCourses}
                  title={"UG Certifications"}
                />
              ) : ClickAbleCourse === "PG Certifications" ? (
                <CourseList
                  categoryItems={PGCertificationCourses}
                  title={"PG Certifications"}
                />
              ) : ClickAbleCourse === "Doctorate/Ph.D." ? (
                <CourseList
                  categoryItems={DoctaratePhd || []}
                  title={"Doctorate/Ph.D."}
                />
              ) : (
                ""
              )}
              {/* <div>
              <div className="child-inner">
                <div className="row g-4 pt--30 pb--60">
                  <div className="col-lg-12">
                    <div className="section-title">
                      <h5 className="rbt-title-style-2">Our Top Course</h5>
                    </div>
                  </div>

                  {CategoryData.categoryItemTwo
                    .slice(0, 4)
                    .map((data, index) => (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6 col-12"
                        key={index}
                      >
                        <div className="rbt-card variation-01 rbt-hover">
                          <div className="rbt-card-img">
                            <a href={`/course-details/${data.id}`}>
                              <Image
                                src={data.courseImg}
                                width={186}
                                height={128}
                                alt="Card image"
                              />
                            </a>
                          </div>
                          <div className="rbt-card-body">
                            <h5 className="rbt-card-title">
                              <a href={`/course-details/${data.id}`}>
                                {data.courseTitle}
                              </a>
                            </h5>
                            <div className="rbt-review">
                              <div className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                              </div>
                              <span className="rating-count">
                                {" "}
                                ({data.review} Reviews)
                              </span>
                            </div>
                            <div className="rbt-card-bottom">
                              <div className="rbt-price">
                                <span className="current-price">$15</span>
                                <span className="off-price">$25</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;

{
  /* <form action="#">
                <input type="text" placeholder="What are you looking for?" />
                <div className="submit-btn">
                  <Link className="rbt-btn btn-gradient btn-md" href="#">
                    Search
                  </Link>
                </div>
              </form> */
}
