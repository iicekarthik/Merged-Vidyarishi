import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import UniSpecializationMain from "@/components/University/Specialization/UniSpecMain";
import Context from "@/context/Context";
import PageHead from "@/pages/Head";
import Store from "@/redux/store";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import AllUniversities from "@/data/vidya/University.json";
// import { useEffect, useState } from "react";
import { useState } from "react";

import { useScreenSize } from "@/hooks/screenSize";

const SupersubslugPage = ({ university, course, specialization }) => {
  const router = useRouter();
  const { slug, subslug, supersubslug } = router.query;

  const [courseData, setCourseData] = useState(course);
  const [universityData, setUniversityData] = useState(university);
  const [specializationData, setSpecializationData] = useState(specialization);

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);
  const currentYear = new Date().getFullYear();

  // const [selectedCourseName, setSelectedCourseName] = useState("");

  // useEffect(() => {
  //   if (!courseData?.degree_type) return;

  //   switch (courseData.degree_type.toLowerCase()) {
  //     case "bachelors":
  //     case "masters":
  //       setSelectedCourseName(courseData.shortName);
  //       break;

  //     case "ug certification":
  //     case "pg certification":
  //       setSelectedCourseName(courseData.course_name);
  //       break;

  //     case "pg diploma":
  //     case "ug diploma":
  //       setSelectedCourseName(courseData.course_name);
  //       break;

  //     default:
  //       setSelectedCourseName("");
  //   }
  // }, [courseData]);

  const selectedCourseName = (() => {
  if (!courseData?.degree_type) return "";

  switch (courseData.degree_type.toLowerCase()) {
    case "bachelors":
    case "masters":
      return courseData.shortName || "";

    case "ug certification":
    case "pg certification":
    case "pg diploma":
    case "ug diploma":
      return courseData.course_name || "";

    default:
      return "";
  }
})();


  return (
    <>
      <PageHead
        title={`${courseData?.course_type} ${courseData?.shortName} in ${specializationData?.specialization_name} from ${universityData?.subtitle} - ${currentYear}`}
        description={`Explore the ${courseData?.shortName} ${courseData?.course_type} program at ${universityData?.subtitle} for ${currentYear} admissions. Learn about fee structure, eligibility, application process, and how this UGC-approved course empowers your career with flexible online and distance education – available across top Indian cities.`}
        keywords={`${universityData?.subtitle} ${courseData?.shortName}, ${courseData?.shortName} online course ${universityData?.subtitle}, ${courseData?.course_type} admission ${currentYear}, ${courseData?.shortName} eligibility ${universityData?.subtitle}, UGC approved ${courseData?.shortName} course, online ${courseData?.shortName} degree, ${universityData?.subtitle} distance education, fees for ${courseData?.shortName} course, apply online ${courseData?.shortName} ${universityData?.subtitle}`}
        image={
          universityData.buildingImage || "/images/vidya/logo/VR_logo2.png"
        }
        url={`https://vidyarishi.com/university/${universityData?.link}/${courseData?.course_link}/${specializationData?.specialization_link}`}
        ogData={{
          title: `${courseData?.course_type} ${selectedCourseName} in ${universityData?.subtitle} Admission ${currentYear}`,
          description: `Explore the ${courseData?.shortName} ${courseData?.course_type} program at ${universityData?.subtitle} for ${currentYear} admissions.`,
          image: courseData?.course_image || "/images/vidya/logo/VR_logo2.png",
          url: `https://vidyarishi.com/university/${universityData?.link}/${courseData?.course_link}`,
          type: "website",
        }}
        twitterData={{
          card: "summary_large_image",
          title: `${courseData?.course_type} ${selectedCourseName} in ${universityData?.subtitle} Admission ${currentYear}`,
          description: `Explore the ${courseData?.shortName} ${courseData?.course_type} program at ${universityData?.subtitle} for ${currentYear} admissions.`,
          image: courseData?.course_image || "/images/vidya/logo/VR_logo2.png",
        }}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${courseData?.course_type} ${courseData?.shortName} in ${specializationData?.specialization_name}`,
          description: `Explore the ${courseData?.shortName} ${courseData?.course_type} program at ${universityData?.subtitle}. Learn about fees, eligibility, UGC approval, and flexible online or distance learning options.`,
          provider: {
            "@type": "UniversityCourseSpecialization",
            name: universityData?.subtitle,
            sameAs: `https://vidyarishi.com/university/${universityData?.link}`,
            logo: {
              "@type": "ImageObject",
              url:
                universityData.buildingImage ||
                "https://vidyarishi.com/images/vidya/logo/VR_logo2.png",
            },
          },
          hasCourseInstance: {
            "@type": "SpecializationInstance",
            courseMode: "online",
            location: {
              "@type": "Place",
              name: "India",
            },
            instructor: {
              "@type": "Organization",
              name: universityData?.subtitle,
            },
          },
        }}
      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <UniSpecializationMain
            BigScreenLogic={BigScreenLogic}
            UniversityData={universityData}
            UniversitySlug={slug}
            SubSlugCourseWithUniversity={subslug}
            SuperSubSlugSpecializationWithUniversity={supersubslug}
            specializationData={specializationData}
            courseData={courseData}
          />
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

// Static Paths for SSG
// pages/[slug]/[subslug]/[supersubslug].js
export async function getStaticPaths() {
  const paths = [];

  AllUniversities?.AllUniversities?.forEach((uni) => {
    const slug = uni?.link;
    const courses = uni?.courses;

    if (!slug || !Array.isArray(courses)) return;

    courses.forEach((course) => {
      const subslug = course?.course_link;
      const specializations = course?.specializations?.specializationList;

      if (!subslug || !Array.isArray(specializations)) return;

      specializations.forEach((spec) => {
        const supersubslug = spec?.specialization_link;

        if (!supersubslug) return;

        paths.push({
          params: {
            slug: String(slug),
            subslug: String(subslug),
            supersubslug: String(supersubslug),
          },
        });
      });
    });
  });

  return {
    paths,
    fallback: "blocking", // Use 'blocking' for SSR fallback on non-generated paths
  };
}

// Static Props for each University Page
export async function getStaticProps({ params }) {
  const { slug, subslug, supersubslug } = params;

  const university =
    AllUniversities?.AllUniversities?.find((u) => u?.link === slug) || null;

  const course =
    university?.courses?.find((c) => c?.course_link === subslug) || null;

  const specialization =
    course?.specializations?.specializationList?.find(
      (s) => s?.specialization_link === supersubslug
    ) || null;

  if (!university || !course || !specialization) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      university,
      course,
      specialization,
    },
    revalidate: 120, // Optional: ISR every 1 hour (optional for production freshness)
  };
}

export default SupersubslugPage;
