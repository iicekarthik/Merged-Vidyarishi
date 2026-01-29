import React, { useEffect, useState } from "react";
import UniCourseOverview from "./UniCourseOverview";
import UniCourseSpecializations from "./UniCourseSpecializations";
import UniCourseSyllabus from "./UniCourseSyllabus";
import UniCourseTop from "./UniCourseTop";
import UniCourseTopUniversitites from "./UniCourseTopUniversities";
import UniCourseFaq from "./UniCourseFaq";
import UniCourseEligibilityDuration from "./UniCourseEligibilityDuration";
import UniCourseAdmissionProcess from "./UniCourseAdmissionProcess";
import UniCourseCareerScope from "./UniCourseCareerScope";
import UniCourseNavbar from "./UniCourseNavbar";
import AllCourses from "@/data/vidya/VidyaCourses.json";
import University from "@/data/vidya/University.json";
import CourseDetailsTable from "../../Courses/CourseDetailsTable";
import UniCourseDetailsTable from "./UniCourseDetailsTable";
import ErrorPage from "@/pages/404";
import Loader from "@/components/Common/Loader";

const UniCourseMain = ({
  UniversityData,
  UniversitySlug,
  SubSlugCourseWithUniversity,
  BigScreenLogic,
}) => {
  const [UniversityDetails, setUniversityDetails] = useState({});
  const [CourseDetails, setCourseDetails] = useState({});

  const FetchCoursesWithUniversity = () => {
    const res = (University?.AllUniversities || [])
      .find((uni) => uni?.link === UniversitySlug)
      ?.courses?.find(
        (item) => item?.course_link === SubSlugCourseWithUniversity
      );

    setCourseDetails(res || {});
  };

  const FetchUniversity = () => {
    const university =
      University?.AllUniversities.find((uni) => uni.link === UniversitySlug) ||
      null;

    setUniversityDetails(university || {});
  };

  useEffect(() => {
    if (SubSlugCourseWithUniversity && UniversitySlug) {
      FetchUniversity();
      FetchCoursesWithUniversity();
    }
  }, [UniversitySlug, SubSlugCourseWithUniversity, AllCourses, University]);

  const filteredUniversities = (University?.AllUniversities || [])?.filter(
    (item) =>
      CourseDetails?.shortName && item?.shortName === CourseDetails?.shortName
  );

  const [hasAllUniCoursesData, sethasAllUniCoursesData] = useState(false);

  useEffect(() => {
    sethasAllUniCoursesData(
      [
        CourseDetails?.syllabus?.semester?.length > 0,
        CourseDetails?.overviewTableDetails?.length > 0,
        CourseDetails?.overview,
        CourseDetails?.specializations,
        CourseDetails?.keyoverview?.length > 0,
        CourseDetails?.career_scope,
        CourseDetails?.admissionProcess,
        CourseDetails?.eligibilityDuration,
        CourseDetails?.aboutCourseDesc,
        CourseDetails?.faq?.length > 0,
        CourseDetails?.topUniversities,
        UniversitySlug,
        SubSlugCourseWithUniversity,
        UniversityData?.courses > 0,
      ].some(Boolean)
    );
  }, [
    CourseDetails &&
    UniversitySlug &&
    SubSlugCourseWithUniversity &&
    UniversityData,
  ]);

  return (
    <>
      {Object.keys(CourseDetails).length > 0 ? (
        <>
          {/* Section one */}
          <div
            style={{
              paddingLeft: `${BigScreenLogic ? "60px" : "10px"}`,
              paddingRight: `${BigScreenLogic ? "60px" : "10px"}`,
            }}
          >
            <UniCourseTop
              BigScreenLogic={BigScreenLogic}
              UniversityData={UniversityData}
              CourseDetails={CourseDetails}
            />
          </div>

          {/* Section Navbar */}
          <div
            style={{
              padding: "0",
              width: "100%",
            }}
          >
            <UniCourseNavbar CourseDetails={CourseDetails} university={UniversityDetails} BigScreenLogic={BigScreenLogic} />
          </div>

          {/* Section Two Bottom  */}
          <div
            style={{
              paddingLeft: `${BigScreenLogic ? "60px" : "10px"}`,
              paddingRight: `${BigScreenLogic ? "60px" : "10px"}`,
            }}
          >
            <UniCourseDetailsTable
              BigScreenLogic={BigScreenLogic}
              UniversityDetails={UniversityDetails}
              filteredUniversities={filteredUniversities}
              CourseDetails={CourseDetails}
            />
            <UniCourseOverview
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />
            <UniCourseEligibilityDuration
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />
            <UniCourseSpecializations
              SubSlugCourseWithUniversity={SubSlugCourseWithUniversity}
              slug={UniversitySlug}
              CourseDetails={CourseDetails}
              BigScreenLogic={BigScreenLogic}
            />
            <UniCourseSyllabus
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />

            {
              CourseDetails?.degree_type !== "Certificate" && (

                <UniCourseTopUniversitites
                  BigScreenLogic={BigScreenLogic}
                  CourseDetails={CourseDetails}
                />
              )
            }
            <UniCourseAdmissionProcess
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />
            <UniCourseCareerScope
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />
            <UniCourseFaq
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />
          </div>
        </>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default UniCourseMain;
