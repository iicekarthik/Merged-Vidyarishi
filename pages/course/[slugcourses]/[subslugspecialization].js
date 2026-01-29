import { useRouter } from "next/router";
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
import Loader from "@/components/Common/Loader";
import SpecializationMain from "@/components/Specialization/SpecializationMain";
import PageHead from "@/pages/Head";
import ErrorPage from "@/pages/404";
// pages/courses/[slugcourses]/[slugspecialization].js

export async function getStaticPaths() {
  const paths = [];

  AllCourses.all_Courses.forEach((course) => {
    const courseLink = course?.course_link;
    const specializations = course?.specializations?.specializationList;

    if (!courseLink || !Array.isArray(specializations)) return;

    specializations.forEach((spec) => {
      const specLink = spec?.specialization_link;

      if (!specLink) return;

      paths.push({
        params: {
          slugcourses: String(courseLink),
          subslugspecialization: String(specLink),
        },
      });
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slugcourses, subslugspecialization } = params;

  const course =
    AllCourses.all_Courses.find((item) => item.course_link === slugcourses) ||
    null;

  const specialization =
    course?.specializations?.specializationList?.find(
      (spec) => spec?.specialization_link === subslugspecialization
    ) || null;

  // 404 if not found
  if (!course || !specialization) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      CourseDetails: course,
      specialization: specialization,
    },
    revalidate: 120,
  };
}

const SpecializationPage = ({ CourseDetails, specialization }) => {
  const router = useRouter();
  const { slugcourses, subslugspecialization } = router.query;
  console.log(router.query);

  // ⏳ Loader while fallback is being generated
  if (router.isFallback) {
    return <Loader />;
  }

  // ❌ Show 404 if no course found
  if (!CourseDetails) {
    return <ErrorPage />;
  }

  const [hasAbout, setHasAbout] = useState(false);
  const [hasAdmissionProcess, setHasAdmissionProcess] = useState(false);
  const [hasSpecialization, setHasSpecialization] = useState(false);
  const [hasFAQ, setHasFAQ] = useState(false);
  const [hasCareerScope, setHasCareerScope] = useState(false);
  const [hasKeyoverview, setHasKeyoverview] = useState(false);
  const [hasEligibility, setHasEligibility] = useState(false);
  const [hasOverviewTableDetails, setHasOverviewTableDetails] = useState(false);
  const [hasOverview, setHasOverview] = useState(false);
  const [hastopUniversities, setHastopUniversities] = useState(false);
  const [hasSyllabus, setHasSyllabus] = useState(false);
  const [hasSpecializations, setHasSpecializations] = useState(false);
  const [hasAnySection, setHasAnySection] = useState(false);

  console.log(typeof specialization);
  useEffect(() => {
    if (!specialization) return;

    setHasOverview(
      specialization?.overview && typeof specialization.overview === "object"
    );
    setHasKeyoverview(!!specialization?.keyoverview?.length);
    setHasEligibility(
      specialization?.eligibilityDuration &&
      typeof specialization.eligibilityDuration === "object"
    );
    setHasSyllabus(
      specialization?.syllabus && typeof specialization.syllabus === "object"
    );

    setHasOverviewTableDetails(!!specialization?.overviewTable?.length);

    setHasAdmissionProcess(
      specialization?.admissionProcess &&
      typeof specialization.admissionProcess === "object"
    );

    setHasFAQ(!!specialization?.faq?.length);

    setHasCareerScope(
      specialization?.career_scope &&
      typeof specialization.career_scope === "object"
    );

    setHasAbout(!!specialization?.about);

    setHastopUniversities(
      specialization?.topUniversities &&
      typeof specialization.topUniversities === "object"
    );

    // Aggregate check: At least one section is present
    setHasAnySection(
      [
        !!specialization?.about,
        !!specialization?.admissionProcess?.length ||
        !!specialization?.admissionSteps,
        !!specialization?.faq?.length,
        !!specialization?.careerScope?.length,
        !!specialization?.keyHighlights?.length,
        !!specialization?.overviewTable?.length,
        !!specialization?.overview?.length,
        !!specialization?.topUniversities?.length,
        !!specialization?.syllabus?.length,
      ].some(Boolean)
    );
  }, [specialization]);

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    <>
      <PageHead
        title={
          specialization?.seo?.title ||
          `${specialization?.specialization_name} – ${CourseDetails?.course_type} ${CourseDetails?.course_name} | Vidyarishi`
        }
        description={
          specialization?.seo?.description ||
          `Explore the ${specialization?.specialization_name} specialization under the ${CourseDetails?.course_type} ${CourseDetails?.course_name} program. Learn online, earn a UGC-approved degree, and grow your career in ${specialization?.specialization_shortname}.`
        }
        keywords={
          specialization?.seo?.keywords ||
          `${specialization?.specialization_name}, ${CourseDetails?.course_type} ${CourseDetails?.course_name}, online ${specialization?.specialization_name} course, Vidyarishi specialization programs`
        }
        image={specialization?.seo?.image || "/images/vidya/logo/VR_logo2.png"}
        url={`https://vidyarishi.com/courses/${CourseDetails?.course_link}/${specialization?.specialization_link}`}
        canonical={`https://vidyarishi.com/courses/${CourseDetails?.course_link}/${specialization?.specialization_link}`}

        ogData={{
          title:
            specialization?.seo?.title ||
            `${specialization?.specialization_name} – ${CourseDetails?.course_type} ${CourseDetails?.course_name}`,
          description:
            specialization?.seo?.description ||
            `Advance your career with the ${specialization?.specialization_name} specialization in ${CourseDetails?.course_type} ${CourseDetails?.course_name}. Study online with UGC-approved learning.`,
          image: specialization?.seo?.image || "/images/vidya/logo/VR_logo2.png",
          url: `https://vidyarishi.com/courses/${CourseDetails?.course_link}/${specialization?.specialization_link}`,
          type: "website",
          siteName: "Vidyarishi",
        }}

        twitterData={{
          card: "summary_large_image",
          title:
            specialization?.seo?.title ||
            `${specialization?.specialization_name} – ${CourseDetails?.course_type} ${CourseDetails?.course_name}`,
          description:
            specialization?.seo?.description ||
            `Explore the ${specialization?.specialization_name} specialization under ${CourseDetails?.course_type} ${CourseDetails?.course_name} at Vidyarishi.`,
          image: specialization?.seo?.image || "/images/vidya/logo/VR_logo2.png",
        }}

        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${CourseDetails?.course_type} ${CourseDetails?.course_name} in ${specialization?.specialization_name}`,
          description:
            specialization?.seo?.description ||
            `Explore the ${specialization?.specialization_name} specialization under ${CourseDetails?.course_type} ${CourseDetails?.course_name} at Vidyarishi.`,
          provider: {
            "@type": "CollegeOrUniversity",
            name: "Vidyarishi",
            logo: {
              "@type": "ImageObject",
              url: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png",
            },
          },
          courseMode: "online",
          url: `https://vidyarishi.com/courses/${CourseDetails?.course_link}/${specialization?.specialization_link}`,
        }}
      />


      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <SpecializationMain
            BigScreenLogic={BigScreenLogic}
            hasAbout={hasAbout}
            hasAdmissionProcess={hasAdmissionProcess}
            hasSpecialization={hasSpecialization}
            hasFAQ={hasFAQ}
            hasCareerScope={hasCareerScope}
            hasKeyoverview={hasKeyoverview}
            hasEligibility={hasEligibility}
            hasOverviewTableDetails={hasOverviewTableDetails}
            hasOverview={hasOverview}
            hastopUniversities={hastopUniversities}
            hasSyllabus={hasSyllabus}
            hasSpecializations={hasSpecializations}
            hasAnySection={hasAnySection}
            CourseDetails={CourseDetails}
            specialization={specialization}
            subslugspecialization={subslugspecialization}
            slugcourses={slugcourses}
          />
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default SpecializationPage;
