import React, { useEffect, useState } from "react";

import SchoolLevelProgramOverview from "./UniSchoolLevelProgramOverview";
import SchoolLevelProgramSyllabus from "./UniSchoolLevelProgramSyllabus";
import SchoolLevelProgramTop from "./UniSchoolLevelProgramTop";
import SchoolLevelProgramFaq from "./UniSchoolLevelProgramFaq";
import SchoolLevelProgramEligibilityDuration from "./UniSchoolLevelProgramEligibilityDuration";
import SchoolLevelProgramAdmissionProcess from "./UniSchoolLevelProgramAdmissionProcess";
import SchoolLevelProgramCareerScope from "./UniSchoolLevelProgramCareerScope";
import SchoolLevelProgramNavbar from "./UniSchoolLevelProgramNavbar";
import SchoolLevelProgramDetailsTable from "./UniSchoolLevelProgramDetailsTable";

import AllCourses from "@/data/vidya/VidyaCourses.json";
import University from "@/data/vidya/University.json";

import Loader from "@/components/Common/Loader";

const UniSchoolLevelProgramMain = ({
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
      ?.schoollevelprogram?.find(
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
          {/* ----- HEADER TOP SECTION ----- */}
          <div
            style={{
              paddingLeft: `${BigScreenLogic ? "60px" : "10px"}`,
              paddingRight: `${BigScreenLogic ? "60px" : "10px"}`,
            }}
          >
            <SchoolLevelProgramTop
              BigScreenLogic={BigScreenLogic}
              UniversityData={UniversityData}
              CourseDetails={CourseDetails}
            />
          </div>

          {/* ----- NAVBAR ----- */}
          <div style={{ padding: "0", width: "100%" }}>
            <SchoolLevelProgramNavbar
              CourseDetails={CourseDetails}
              university={UniversityDetails}
              BigScreenLogic={BigScreenLogic}
            />
          </div>

          {/* ----- MAIN CONTENT ----- */}
          <div
            style={{
              paddingLeft: `${BigScreenLogic ? "60px" : "10px"}`,
              paddingRight: `${BigScreenLogic ? "60px" : "10px"}`,
            }}
          >
            {/* DETAILS TABLE */}
            <SchoolLevelProgramDetailsTable
              BigScreenLogic={BigScreenLogic}
              UniversityDetails={UniversityDetails}
              filteredUniversities={filteredUniversities}
              CourseDetails={CourseDetails}
            />

            {/* OVERVIEW */}
            <SchoolLevelProgramOverview
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />

            {/* ELIGIBILITY & DURATION */}
            <SchoolLevelProgramEligibilityDuration
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />

            {/* SYLLABUS */}
            <SchoolLevelProgramSyllabus
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />

            {/* ADMISSION */}
            <SchoolLevelProgramAdmissionProcess
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />

            {/* CAREER SCOPE */}
            <SchoolLevelProgramCareerScope
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
            />

            {/* FAQ */}
            <SchoolLevelProgramFaq
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

export default UniSchoolLevelProgramMain;
