import Link from "next/link";
import { useEffect, useState } from "react";
import sal from "sal.js";
import Card from "../Cards/Card";
// import CourseDetails from "../../data/course-details/courseData.json";
// import CategoryData from "../../data/elements/category.json";
import AllCourses from "../../data/vidya/VidyaCourses.json";
import { useScreenSize } from "@/hooks/screenSize";

const CourseHome = () => {
  const [UnderGraduationCourse, setUndeGraduationrCourse] = useState(null);
  const [UnderGraduationCourseTwo, setUndeGraduationrCourseTwo] =
    useState(null);
  const [AllUnderGraduationCourse, setAllUndeGraduationrCourseTwo] =
    useState(null);
  const [PostGraduationCourse, setPostGraduationCourse] = useState(null);
  const [PostGraduationCourseTwo, setPostGraduationCourseTwo] = useState(null);
  const [AllPostGraduationCourse, setAllPostGraduationCourseTwo] =
    useState(null);
  const [UGDiplomaCourses, setUGDiplomaCourses] = useState(null);
  const [PGDiplomaCourses, setPGDiplomaCourses] = useState(null);

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
      const degreeOrder = ["Masters", "Bachelors"];

      return AllCourses?.all_Courses
        ?.filter((course) => {
          const matchesMode =
            !modeFilter ||
            (Array.isArray(modeFilter)
              ? modeFilter.includes(course.course_type)
              : course.course_type === modeFilter);

          const matchesCourseName =
            !CourseNameFilter ||
            (Array.isArray(CourseNameFilter)
              ? CourseNameFilter.includes(course.shortName)
              : course.shortName === CourseNameFilter);

          const matchesDegreeLevel =
            !degreeLevelFilter || course.degree_type === degreeLevelFilter;

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

    // 🔹 Bachelors Degree Courses
    setUndeGraduationrCourse(extractCourses(() => true, "Online", "Bachelors"));

    // 🔹 Masters Degree Courses
    setPostGraduationCourse(extractCourses(() => true, "Online", "Masters"));

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

    setUndeGraduationrCourse(bachelorsOnline);
    setUndeGraduationrCourseTwo(bachelorsDistance);
    setAllUndeGraduationrCourseTwo([...bachelorsOnline, ...bachelorsDistance]);

    // 🔹 Masters Degree Courses
    const mastersOnline = extractCourses(
      () => true,
      ["Online", "F-Tell"],
      "Masters"
    );
    const mastersDistance = extractCourses(
      () => true,
      ["Distance"],
      "Masters",
      ["MLIS"]
    );

    setPostGraduationCourse(mastersOnline);
    setPostGraduationCourseTwo(mastersDistance);
    setAllPostGraduationCourseTwo([...mastersOnline, ...mastersDistance]);

    // 🔹 Diploma Courses
    setUGDiplomaCourses(
      extractCourses(() => true, null, "Undergraduate Diploma")
    );
    setPGDiplomaCourses(
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

  const [ClickAbleCourse, setClickAbleCourse] = useState(
    "Post Graduation Course"
  );

  const HandleChangeCourse = (data) => {
    setClickAbleCourse(data);
  };

  useEffect(() => {
    sal({
      threshold: 0.01,
      once: true,
    });
  }, []);

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    <>
      <main className="rbt-main-wrapper">
        <div className="rbt-categories-area bg-color-white rbt-section-gapBottom">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                Gap: "20px",
                width: "100%",
              }}
            >
              <div>
                <div>
                  <div
                    className={`${BigScreenLogic ? "rbt-button-group" : ""}`}
                  >
                    <div
                      // className="d-flex justify-content-center align-items-center"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: `${BigScreenLogic ? "row" : "column"}`,
                        width: "100%",
                        justifyContent: "center", // Center-aligns the buttons
                        gap: BigScreenLogic && "10px", // Adds space between buttons
                      }}
                    >
                      {[
                        {
                          title: "PG Course",
                          id: "Post Graduation Course",
                        },
                        {
                          title: "UG Course",
                          id: "Under Graduation Course",
                        },
                        {
                          title: "PG Diploma Course",
                          id: "Postgraduate Diploma",
                        },
                        {
                          title: "UG Diploma Course",
                          id: "Undergraduate Diploma",
                        },
                        {
                          title: "PG Certifications",
                          id: "Post Graduation Certifications",
                        },
                        {
                          title: "UG Certifications",
                          id: "Under Graduation Certifications",
                        },
                        {
                          title: "Doctorate/Ph.D.",
                          id: "Doctorate/Ph.D.",
                        },
                      ]?.map((list, index) => (
                        <button
                          key={index}
                          className={`rbt-btn px-4 ${
                            BigScreenLogic ? "my-3" : "my-2"
                          } ${
                            ClickAbleCourse === list?.id &&
                            "btn-gradient btn-gradient-2"
                          } `}
                          onClick={() => HandleChangeCourse(list?.id)}
                          style={{
                            flex: "0 1 auto", // Ensures buttons are flexible but not too stretched
                          }}
                        >
                          {list?.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className=""
                style={{
                  //   border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "auto",
                  marginTop: "8px",
                  padding: "10px",
                }}
              >
                {ClickAbleCourse === "Under Graduation Course" ? (
                  <>
                    <div
                      style={{
                        marginLeft: "-15px",
                      }}
                    >
                      <Card
                        col="col-lg-2 col-md-4 col-sm-6 col-6"
                        // mt="mt--20"
                        categoryItems={AllUnderGraduationCourse}
                        title={"Under Graduation (UG) Course"}
                        // start={HomeOnlineCourse && 4}
                        // end={HomeOnlineCourse && 12}
                        // isDesc={true}
                        // isUser={true}
                      />
                    </div>
                  </>
                ) : ClickAbleCourse === "Post Graduation Course" ? (
                  <>
                    <div
                      style={{
                        marginLeft: "-15px",
                      }}
                    >
                      <Card
                        col="col-lg-2 col-md-4 col-sm-6 col-6"
                        // mt="mt--20"
                        categoryItems={AllPostGraduationCourse}
                        title={"Post Graduation (PG) Courses"}
                        // start={0}
                        // end={HomeDistanceCourse && 4}
                        // isDesc={true}
                        // isUser={true}
                      />
                    </div>
                  </>
                ) : ClickAbleCourse === "Undergraduate Diploma" ? (
                  <>
                    <div
                      style={{
                        marginLeft: "-15px",
                      }}
                    >
                      <Card
                        col="col-lg-2 col-md-4 col-sm-6 col-6"
                        // mt="mt--20"
                        categoryItems={UGDiplomaCourses}
                        title={"Under Graduation Diploma Courses"}
                        // start={0}
                        // end={HomeMBACourse && 8}
                        // isDesc={true}
                        // isUser={true}
                      />
                    </div>
                  </>
                ) : ClickAbleCourse === "Postgraduate Diploma" ? (
                  <>
                    <div
                      style={{
                        marginLeft: "-15px",
                      }}
                    >
                      <Card
                        col="col-lg-2 col-md-4 col-sm-6 col-6"
                        // mt="mt--20"
                        categoryItems={PGDiplomaCourses}
                        title={"Post Graduation Diploma Courses"}
                        // start={0}
                        // end={HomeMBACourse && 8}
                        // isDesc={true}
                        // isUser={true}
                      />
                    </div>
                  </>
                ) : ClickAbleCourse === "Post Graduation Certifications" ? (
                  <>
                    <div
                      style={{
                        marginLeft: "-15px",
                      }}
                    >
                      <Card
                        col="col-lg-2 col-md-4 col-sm-6 col-6"
                        // mt="mt--20"
                        title={"Post Graduation Certification Courses"}
                        categoryItems={PGCertificationCourses}
                        // start={0}
                        // end={HomeCertificateCourse && 2}
                        // isDesc={true}
                        // isUser={true}
                      />
                    </div>
                  </>
                ) : ClickAbleCourse === "Under Graduation Certifications" ? (
                  <>
                    <div
                      style={{
                        marginLeft: "-15px",
                      }}
                    >
                      <Card
                        col="col-lg-2 col-md-4 col-sm-6 col-6"
                        // mt="mt--20"
                        title={"Under Graduation Certification Courses"}
                        categoryItems={UGCertificationCourses}
                        // start={0}
                        // end={HomeCertificateCourse && 2}
                        // isDesc={true}
                        // isUser={true}
                      />
                    </div>
                  </>
                ) : ClickAbleCourse === "Doctorate/Ph.D." ? (
                  <>
                    <div
                      style={{
                        marginLeft: "-15px",
                      }}
                    >
                      <Card
                        col="col-lg-2 col-md-4 col-sm-6 col-6"
                        // mt="mt--20"
                        title={"Doctorate/Ph.D."}
                        categoryItems={DoctaratePhd}
                        // start={0}
                        // end={HomeCertificateCourse && 2}
                        // isDesc={true}
                        // isUser={true}
                      />
                    </div>
                  </>
                ) : (
                  "Not Found"
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CourseHome;
