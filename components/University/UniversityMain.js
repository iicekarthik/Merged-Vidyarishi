import React from "react";
import UniversityTop from "./universityTop";
import UniversitySubnav from "./universitySubnav";
import AboutUniversity from "./AboutUniversity";
import Approvals from "./Approvals";
import CoursesUniversity from "./CoursesUniversity";
import Emi from "./Emi";
import SampleCertificate from "./SampleCertificate";
import Advantages from "./Advantages";
import ExamPattern from "./ExamPattern";
import HiringPartners from "./HiringPartners";
import AdmissionProcess from "./AdmissionProcess";
import OtherUniversities from "./OtherUniversities";
import FAQ from "./FAQ";
import UniSchoolLevelProgramList from "./UniSchoolLevelProgramList";

const UniversityMain = ({
  BigScreenLogic,
  screenSize,
  university,

  slug,

  hasAnySection,
  hasAbout,
  hasAccredation,
  hasCourses,
  hasSampleCertificate,
  hasAdvantages,
  hasExamPattern,
  hasCompanyDetails,
  hasAdmissionProcess,
  hasFAQ,
}) => {
  return (
    <>
      <div
        style={{
          paddingLeft: `${BigScreenLogic ? "60px" : "10px"}`,
          paddingRight: `${BigScreenLogic ? "60px" : "10px"}`,
        }}
      >
        <UniversityTop university={university} screenSize={screenSize} />
      </div>
      <UniversitySubnav university={university} screenSize={screenSize} />

      <div
        style={{
          paddingLeft: `${BigScreenLogic ? "60px" : "5px"}`,
          paddingRight: `${BigScreenLogic ? "60px" : "5px"}`,
        }}
      >
        {!hasAnySection && (
          <div className="py-5 text-center mt--80 ">
            <h3>
              We Are Making More Intresting Just KEEP EXPLORING OUR UNIVERSITIES
            </h3>
          </div>
        )}
        {hasAbout && <AboutUniversity university={university} />}

        {hasAccredation && <Approvals university={university} />}

        {hasCourses && (
          <CoursesUniversity
            slug={slug}
            university={university}
            screenSize={screenSize}
          />
        )}

        {university.hasSchoolLevelProgram && (
          <UniSchoolLevelProgramList
            slug={slug}
            university={university}
            screenSize={screenSize}
          />
        )}

        <Emi university={university} />

        {hasSampleCertificate && (
          <SampleCertificate university={university} screenSize={screenSize} />
        )}

        {/* {hasMastersSpecialization && (
            <ManagementSpecialization university={university} />
          )} */}

        {/* {hasEligibilityForIndian ? (
            <EligibilityCriteria university={university} />
          ) : hasEligibilityForForeigner ? (
            <EligibilityCriteria university={university} />
            ) : (
              hasEligibilityForForeigner &&
            hasEligibilityForIndian && (
              <EligibilityCriteria university={university} />
            )
          )} */}

        {hasAdvantages && (
          <Advantages university={university} screenSize={screenSize} />
        )}

        {hasExamPattern && <ExamPattern university={university} />}

        {hasCompanyDetails && <HiringPartners university={university} />}

        {hasAdmissionProcess && <AdmissionProcess university={university} />}

        {/* {hasFaculty && <Faculty university={university} />} */}
        <OtherUniversities university={university} />
        {/* <Blog u5versity={university} /> */}

        {hasFAQ && <FAQ university={university} BigScreenLogic={BigScreenLogic} />}
        {/* <Separator />
          <FooterThree /> */}
      </div>
    </>
  );
};

export default UniversityMain;
