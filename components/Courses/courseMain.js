import React from "react";
import CourseOverview from "./CourseOverview";
import CourseSpecializations from "./CourseSpecializations";
import CourseSyllabus from "./CourseSyllabus";
import CourseTop from "./CourseTop";
import CourseTopUniversitites from "./CourseTopUniversitites";
import CourseFaq from "./CourseFaq";
import CourseEligibilityDuration from "./CourseEligibilityDuration";
import CourseAdmissionProcess from "./CourseAdmissionProcess";
import CourseCareerScope from "./CourseCareerScope";
import CourseNavbar from "./CourseNavbar";
import AllCourses from "@/data/vidya/VidyaCourses.json";
import University from "@/data/vidya/University.json";
import CourseDetailsTable from "./CourseDetailsTable";

const CourseMain = ({
  hasAbout,
  hasAdmissionProcess,
  hasSpecialization,
  hasFAQ,
  hasCareerScope,
  hasKeyoverview,
  hasOverviewTableDetails,
  hasOverview,
  hastopUniversities,
  hasSyllabus,
  hasSpecializations,
  hasAnySection,
  CourseDetails,
  BigScreenLogic,
  slugcourses,
  MainSpecializations,
}) => {
  const filteredUniversities = (University?.AllUniversities || [])
    .flatMap((uni) => uni.courses || [])
    .filter(
      (item) =>
        CourseDetails?.shortName &&
        item?.shortName?.toLowerCase() ===
          CourseDetails?.shortName?.toLowerCase()
    );

  // if (!hasAnySection) {
  //   return (
  //     <div className="text-center py-20 text-xl font-medium text-gray-700">
  //       We will update you shortly.
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* Section one */}
      <div
        style={{
          paddingLeft: `${BigScreenLogic ? "60px" : "10px"}`,
          paddingRight: `${BigScreenLogic ? "60px" : "10px"}`,
        }}
      >
        <CourseTop
          MainSpecializations={MainSpecializations}
          slugcourses={slugcourses}
          CourseDetails={CourseDetails}
        />
      </div>

      {/* Section Navbar */}
      <CourseNavbar />

      {/* Section Two Bottom */}
      <div
        style={{
          paddingLeft: `${BigScreenLogic ? "60px" : "25px"}`,
          paddingRight: `${BigScreenLogic ? "60px" : "25px"}`,
        }}
      >
        <CourseDetailsTable
          BigScreenLogic={BigScreenLogic}
          filteredUniversities={filteredUniversities}
          CourseDetails={CourseDetails}
        />
      </div>

      {/* Remaining Sections */}
      <div
        style={{
          paddingLeft: `${BigScreenLogic ? "60px" : "10px"}`,
          paddingRight: `${BigScreenLogic ? "60px" : "10px"}`,
        }}
      >
        {hasOverview && (
          <CourseOverview
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
          />
        )}

        <CourseEligibilityDuration
          BigScreenLogic={BigScreenLogic}
          CourseDetails={CourseDetails}
        />

        {hasSpecializations && (
          <CourseSpecializations
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
            slugcourses={slugcourses}
            MainSpecializations={MainSpecializations}
          />
        )}

        {/* {hasSyllabus && (
          <CourseSyllabus
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
          />
        )} */}

        {/* {hastopUniversities && (
          <CourseTopUniversitites
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
          />
        )}

        {hasAdmissionProcess && (
          <CourseAdmissionProcess
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
          />
        )} */}

        {hasCareerScope && (
          <CourseCareerScope
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
          />
        )}

        {hasFAQ && (
          <CourseFaq
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
          />
        )}
      </div>
    </div>
  );
};

export default CourseMain;
