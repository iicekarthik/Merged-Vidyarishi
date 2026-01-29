import React from "react";
import CourseOverview from "./SpecializationOverview";
import CourseSpecializations from "./SpecializationSpecializations";
import CourseSyllabus from "./SpecializationSyllabus";
import CourseTop from "./SpecializationTop";
import CourseTopUniversitites from "./SpecializationTopUniversitites";
import CourseFaq from "./SpecializationFaq";
import CourseEligibilityDuration from "./SpecializationEligibilityDuration";
import CourseAdmissionProcess from "./SpecializationAdmissionProcess";
import CourseCareerScope from "./SpecializationCareerScope";
import CourseNavbar from "./SpecializationNavbar";
import AllCourses from "@/data/vidya/VidyaCourses.json";
import University from "@/data/vidya/University.json";
import CourseDetailsTable from "./SpecializationDetailsTable";
import SpecializationTop from "./SpecializationTop";
import SpecializationNavbar from "./SpecializationNavbar";
import SpecializationDetailsTable from "./SpecializationDetailsTable";
import SpecializationOverview from "./SpecializationOverview";
import SpecializationEligibilityDuration from "./SpecializationEligibilityDuration";
import SpecializationSyllabus from "./SpecializationSyllabus";
import SpecializationTopUniversitites from "./SpecializationTopUniversitites";
import SpecializationAdmissionProcess from "./SpecializationAdmissionProcess";
import SpecializationCareerScope from "./SpecializationCareerScope";
import SpecializationFaq from "./SpecializationFaq";

const SpecializationMain = ({
  hasAbout,
  hasAdmissionProcess,
  hasSpecialization,
  hasFAQ,
  hasCareerScope,
  hasKeyoverview,
  hasEligibility,
  hasOverviewTableDetails,
  hasOverview,
  hastopUniversities,
  hasSyllabus,
  hasSpecializations,
  hasAnySection,
  CourseDetails,
  slugcourses,
  BigScreenLogic,
  specialization,
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
        <SpecializationTop
          slugcourses={slugcourses}
          CourseDetails={CourseDetails}
          specialization={specialization}
        />
      </div>

      {/* Section Navbar */}
      <SpecializationNavbar />

      {/* Section Two Bottom */}
      <div
        style={{
          paddingLeft: `${BigScreenLogic ? "60px" : "25px"}`,
          paddingRight: `${BigScreenLogic ? "60px" : "25px"}`,
        }}
      >
        {hasKeyoverview && (
          <SpecializationDetailsTable
            BigScreenLogic={BigScreenLogic}
            filteredUniversities={filteredUniversities}
            CourseDetails={CourseDetails}
            specialization={specialization}
          />
        )}
      </div>

      {/* Remaining Sections */}
      <div
        style={{
          paddingLeft: `${BigScreenLogic ? "60px" : "10px"}`,
          paddingRight: `${BigScreenLogic ? "60px" : "10px"}`,
        }}
      >
        {hasOverview && (
          <SpecializationOverview
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
            specialization={specialization}
          />
        )}

        {hasEligibility && (
          <SpecializationEligibilityDuration
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
            specialization={specialization}
            />
          )}

        {hasSyllabus && (
          <SpecializationSyllabus
          BigScreenLogic={BigScreenLogic}
          CourseDetails={CourseDetails}
          specialization={specialization}
          />
        )}

        {hastopUniversities && (
          <SpecializationTopUniversitites
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
            specialization={specialization}
          />
        )}

        {hasAdmissionProcess && (
          <SpecializationAdmissionProcess
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
            specialization={specialization}
          />
        )}

        {hasCareerScope && (
          <SpecializationCareerScope
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
            specialization={specialization}
          />
        )}

        {hasFAQ && (
          <SpecializationFaq
            BigScreenLogic={BigScreenLogic}
            CourseDetails={CourseDetails}
            specialization={specialization}
          />
        )}
      </div>
    </div>
  );
};

export default SpecializationMain;
