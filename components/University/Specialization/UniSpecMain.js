import React, { useEffect, useState } from "react";
import UniCourseOverview from "./UniSpecOverview";
import UniCourseSpecializations from "./UniSpecializations";
import UniCourseSyllabus from "./UniSpecSyllabus";
import UniCourseTop from "./UniSpecTop";
import UniCourseTopUniversitites from "./UniSpecTopUniversities";
import UniCourseFaq from "./UniSpecFaq";
import UniCourseEligibilityDuration from "./UniSpecEligibilityDuration";
import UniCourseAdmissionProcess from "./UniSpecAdmissionProcess";
import UniCourseCareerScope from "./UniSpecCareerScope";
import UniCourseNavbar from "./UniSpecNavbar";
import AllCourses from "@/data/vidya/VidyaCourses.json";
import University from "@/data/vidya/University.json";
import CourseDetailsTable from "../../Courses/CourseDetailsTable";
import UniCourseDetailsTable from "./UniSpecDetailsTable";
import ErrorPage from "@/pages/404";
import Loader from "@/components/Common/Loader";
import UniSpecializationNavbar from "./UniSpecNavbar";
import UniSpecializationTop from "./UniSpecTop";
import UniSpecializationsAdmissionProcess from "./UniSpecAdmissionProcess";
import UniSpecializationDetailsTable from "./UniSpecDetailsTable";
import UniSpecializationOverview from "./UniSpecOverview";
import UniSpecializationEligibilityDuration from "./UniSpecEligibilityDuration";
import UniSpecializationsSyllabus from "./UniSpecSyllabus";
import UniSpecializationTopUniversitites from "./UniSpecTopUniversities";
import UniSpecializationCareerScope from "./UniSpecCareerScope";

const UniSpecializationMain = ({
  UniversityData,
  UniversitySlug,
  SubSlugCourseWithUniversity,
  BigScreenLogic,
  SuperSubSlugSpecializationWithUniversity,
  specializationData,
  courseData,
}) => {
  const [UniversityDetails, setUniversityDetails] = useState(UniversityData);
  const [CourseDetails, setCourseDetails] = useState(courseData);
  const [specializationDetails, setSpecializationDetails] =
    useState(specializationData);

  // const FetchCoursesWithUniversity = () => {
  //   const res = (University?.AllUniversities || [])
  //     .find((uni) => uni?.link === UniversitySlug)
  //     ?.courses?.find(
  //       (item) => item?.course_link === SubSlugCourseWithUniversity
  //     );

  //   setCourseDetails(res || {});
  // };

  // use this SuperSubSlugSpecializationWithUniversity
  // const FetchSpecializationWithUniversity = () => {
  //   const res = (University?.AllUniversities || [])
  //     .find((uni) => uni?.link === UniversitySlug)
  //     ?.courses?.find(
  //       (item) => item?.course_link === SubSlugCourseWithUniversity
  //     );

  //   setSpecializationDetails(res || {});
  // };

  // const FetchUniversity = () => {
  //   const university =
  //     University?.AllUniversities.find((uni) => uni.link === UniversitySlug) ||
  //     null;

  //   setUniversityDetails(university || {});
  // };

  // useEffect(() => {
  //   if (SubSlugCourseWithUniversity && UniversitySlug) {
  //     FetchUniversity();
  //     FetchCoursesWithUniversity();
  //   }
  // }, [UniversitySlug, SubSlugCourseWithUniversity, AllCourses, University]);

  const filteredUniversities = (University?.AllUniversities || [])?.filter(
    (item) =>
      CourseDetails?.shortName && item?.shortName === CourseDetails?.shortName
  );

  const [hasAllUniCoursesData, sethasAllUniCoursesData] = useState(false);

  useEffect(() => {
    sethasAllUniCoursesData(
      [
        specializationDetails?.syllabus?.semester?.length > 0,
        specializationDetails?.overviewTableDetails?.length > 0,
        specializationDetails?.overview,
        specializationDetails?.specializations,
        specializationDetails?.keyoverview?.length > 0,
        specializationDetails?.career_scope,
        specializationDetails?.admissionProcess,
        specializationDetails?.eligibilityDuration,
        specializationDetails?.aboutCourseDesc,
        specializationDetails?.faq?.length > 0,
        specializationDetails?.topUniversities,
        UniversitySlug,
        SubSlugCourseWithUniversity,
        SuperSubSlugSpecializationWithUniversity,
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
            <UniSpecializationTop
              BigScreenLogic={BigScreenLogic}
              UniversityData={UniversityData}
              CourseDetails={CourseDetails}
              specializationDetails={specializationDetails}
            />
          </div>

          {/* Section Navbar */}
          <div
            style={{
              padding: "0",
              width: "100%",
            }}
          >
            <UniSpecializationNavbar BigScreenLogic={BigScreenLogic} />
          </div>

          {/* Section Two Bottom  */}
          <div
            style={{
              paddingLeft: `${BigScreenLogic ? "60px" : "10px"}`,
              paddingRight: `${BigScreenLogic ? "60px" : "10px"}`,
            }}
          >
            <UniSpecializationDetailsTable
              BigScreenLogic={BigScreenLogic}
              UniversityDetails={UniversityDetails}
              filteredUniversities={filteredUniversities}
              CourseDetails={CourseDetails}
              specializationDetails={specializationDetails}
            />
            <UniSpecializationOverview
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
              specializationDetails={specializationDetails}
            />
            <UniSpecializationEligibilityDuration
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
              specializationDetails={specializationDetails}
            />
            {/* <UniCourseSpecializations
              SubSlugCourseWithUniversity={SubSlugCourseWithUniversity}
              slug={UniversitySlug}
              CourseDetails={specializationDetails}
              BigScreenLogic={BigScreenLogic}
            /> */}
            <UniSpecializationsSyllabus
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
              specializationDetails={specializationDetails}
            />
            <UniSpecializationTopUniversitites
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
              specializationDetails={specializationDetails}
            />
            <UniSpecializationsAdmissionProcess
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
              specializationDetails={specializationDetails}
            />
            <UniSpecializationCareerScope
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
              specializationDetails={specializationDetails}
              />
            <UniCourseFaq
              BigScreenLogic={BigScreenLogic}
              CourseDetails={CourseDetails}
              specializationDetails={specializationDetails}
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

export default UniSpecializationMain;
