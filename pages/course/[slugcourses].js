import { useRouter } from "next/router";
import PageHead from "../Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import Store from "@/redux/store";
import CourseMain from "@/components/Courses/courseMain";
import AllCourses from "@/data/vidya/VidyaCourses.json";
import { useEffect, useState } from "react";
import { useScreenSize } from "@/hooks/screenSize";
import Loader from "@/components/Common/Loader"; // Custom Loader component
import ErrorPage from "../404";
import { useFetchSpecializations } from "@/hooks/useFetchSpecializations";

// getStaticPaths
export async function getStaticPaths() {
  const paths = AllCourses.all_Courses.map((course) => ({
    params: { slugcourses: course.course_link },
  }));

  return {
    paths,
    fallback: "blocking", // Enable fallback for new dynamic pages
  };
}

//  getStaticProps
export async function getStaticProps({ params }) {
  const courseData = AllCourses.all_Courses.find(
    (item) => item.course_link === params.slugcourses
  );

  return {
    props: {
      CourseDetails: courseData || null,
    },
    revalidate: 60, // Optional: Revalidate every 60s
  };
}

// Main Component
const CoursePage = ({ CourseDetails }) => {
  const router = useRouter();
  const { slugcourses } = router.query;
  // ⏳ Loader while fallback is being generated
  if (router.isFallback) {
    return <Loader />;
  }

  //  Show 404 if no course found
  if (!CourseDetails) {
    return <ErrorPage />;
  }

  const [hasAbout, setHasAbout] = useState(false);
  const [hasAdmissionProcess, setHasAdmissionProcess] = useState(false);
  const [hasSpecialization, setHasSpecialization] = useState(false);
  const [hasFAQ, setHasFAQ] = useState(false);
  const [hasCareerScope, setHasCareerScope] = useState(false);
  const [hasKeyoverview, setHasKeyoverview] = useState(false);
  const [hasOverviewTableDetails, setHasOverviewTableDetails] = useState(false);
  const [hasOverview, setHasOverview] = useState(false);
  const [hastopUniversities, setHastopUniversities] = useState(false);
  const [hasSyllabus, setHasSyllabus] = useState(false);
  const [hasSpecializations, setHasSpecializations] = useState(false);
  const [hasAnySection, setHasAnySection] = useState(false);

  useEffect(() => {
    if (!CourseDetails) return;

    setHasAbout(!!CourseDetails?.aboutCourseDesc);
    setHasAdmissionProcess(
      !!CourseDetails?.admissionProcessPoints?.admissionProcessKeyPoint
        ?.length && !!CourseDetails?.admissionProcessPoints?.heading
    );
    setHasSpecialization(
      !!CourseDetails?.specializations?.specializationList?.length
    );
    setHasFAQ(!!CourseDetails?.faq?.length);
    setHasCareerScope(
      !!CourseDetails?.career_scope?.subCareerScope?.careerPoints?.length
    );
    setHasKeyoverview(!!CourseDetails?.keyoverview?.length);
    setHasOverviewTableDetails(!!CourseDetails?.overviewTableDetails?.length);
    setHasOverview(!!CourseDetails?.overview?.overviewDetails?.length);
    setHastopUniversities(
      !!CourseDetails?.topUniversities?.pointOne?.length &&
        !!CourseDetails?.topUniversities?.pointTwo?.length &&
        !!CourseDetails?.topUniversities?.pointThree?.length &&
        !!CourseDetails?.topUniversities?.pointFour?.length
    );
    setHasSyllabus(!!CourseDetails?.syllabus?.semester?.length);
    setHasSpecializations(
      !!CourseDetails?.specializations?.specializationList?.length
    );

    setHasAnySection(
      [
        !!CourseDetails?.aboutCourseDesc,
        !!CourseDetails?.admissionProcessPoints?.admissionProcessKeyPoint
          ?.length && !!CourseDetails?.admissionProcessPoints?.heading,
        !!CourseDetails?.specializations?.specializationList?.length,
        !!CourseDetails?.faq?.length,
        !!CourseDetails?.career_scope?.subCareerScope?.careerPoints?.length,
        !!CourseDetails?.keyoverview?.length,
        !!CourseDetails?.overviewTableDetails?.length,
        !!CourseDetails?.overview?.overviewDetails?.length,
        !!CourseDetails?.topUniversities?.pointOne?.length &&
          !!CourseDetails?.topUniversities?.pointTwo?.length &&
          !!CourseDetails?.topUniversities?.pointThree?.length &&
          !!CourseDetails?.topUniversities?.pointFour?.length,
        !!CourseDetails?.syllabus?.semester?.length,
        !!CourseDetails?.specializations?.specializationList?.length,
      ].some(Boolean)
    );
  }, [CourseDetails]);

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  const { specializations, specializationloading, fetchByCourseAndDegree } =
    useFetchSpecializations();

  useEffect(() => {
    fetchByCourseAndDegree(
      CourseDetails?.shortName,
      CourseDetails?.degree_type
    );
  }, [fetchByCourseAndDegree]);


  return (
    <>
      <PageHead
        title={`${CourseDetails?.course_type} ${CourseDetails?.course_name} – Online Course by Vidyarishi`}
        description={
          CourseDetails?.seo?.description ||
          `Enroll in the ${CourseDetails?.course_type} ${CourseDetails?.course_name} program by Vidyarishi to gain expert knowledge and practical skills. Study online with a flexible schedule and earn a UGC-approved degree tailored for modern learners.`
        }
        keywords={
          CourseDetails?.seo?.keywords ||
          `Vidyarishi ${CourseDetails?.course_type} ${CourseDetails?.course_name}, ${CourseDetails?.course_type} ${CourseDetails?.course_name} course, ${CourseDetails?.course_type} learning, UGC-approved courses, best ${CourseDetails?.course_type} courses in India`
        }
        image={CourseDetails?.seo?.image || "/images/vidya/logo/VR_logo2.png"}
        url={`https://vidyarishi.com/course/${CourseDetails?.course_link}`}
      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />

          <CourseMain
            BigScreenLogic={BigScreenLogic}
            hasAbout={hasAbout}
            hasAdmissionProcess={hasAdmissionProcess}
            hasSpecialization={hasSpecialization}
            hasFAQ={hasFAQ}
            hasCareerScope={hasCareerScope}
            hasKeyoverview={hasKeyoverview}
            hasOverviewTableDetails={hasOverviewTableDetails}
            hasOverview={hasOverview}
            hastopUniversities={hastopUniversities}
            hasSyllabus={hasSyllabus}
            hasSpecializations={hasSpecializations}
            hasAnySection={hasAnySection}
            CourseDetails={CourseDetails}
            slugcourses={slugcourses}
            MainSpecializations={specializations}
          />
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default CoursePage;
