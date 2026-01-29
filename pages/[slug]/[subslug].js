import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PageHead from "../Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Store from "@/redux/store";
import AllUniversities from "@/data/vidya/University.json";
import Loader from "@/components/Common/Loader";
import UniCourseMain from "@/components/University/Courses/UniCourseMain";
import UniSchoolLevelProgramMain from "@/components/University/SchoolProgram/UniSchoolLevelProgramMain";
import { useScreenSize } from "@/hooks/screenSize";
import ErrorPage from "../404";

const SubslugPage = ({ university, course }) => {
  const router = useRouter();
  const { slug, subslug } = router.query;

  const [courseData, setCourseData] = useState(course);
  const [universityData, setUniversityData] = useState(university);

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);
  const currentYear = new Date().getFullYear();

  // Determine if marketing page should render
  const isMarketingPage =
    router.asPath.includes(`/${universityData?.link}/online-admission`) &&
    universityData?.isMarketingPage;

  // Show loader while fetching
  if (router.isFallback) return <Loader />;

  if (isMarketingPage) {
    // Iframe Marketing Component
    const MarketingPage = () => {
      const screenSize = useScreenSize();
      const [loading, setLoading] = useState(true);

      const getIframeHeight = () => {
        switch (screenSize) {
          case "xxl":
          case "xl":
            return "99vh";
          case "lg":
          case "md":
          case "sm":
            return "98vh";
          case "xs":
            return "96vh";
          default:
            return "99vh";
        }
      };

      // Dynamic iframe URL based on university
      const iframeSrc =
        universityData?.MarketingLink &&
        `${"https://vidyarishi-marketing.vercel.app"}/${universityData?.link}`;
      // `${"http://localhost:5173"}/${universityData?.link}`;

      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: getIframeHeight(),
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {loading && <Loader />}
          <iframe
            src={iframeSrc}
            title={`${universityData?.subtitle} Online Admission`}
            style={{ width: "100%", height: getIframeHeight(), border: "0" }}
            frameBorder="0"
            allowFullScreen
            // sandbox="allow-scripts allow-forms allow-same-origin"
            loading="lazy"
            onLoad={() => setLoading(false)}
          />
        </div>
      );
    };

    return (
      <>
        <PageHead
          title={`Online Admission - ${universityData?.subtitle}`}
          description={`online admission at ${universityData?.subtitle}`}
          keywords={`online admission, ${universityData?.subtitle}`}
          url={`https://vidyarishi.com/${universityData?.link}/online-admission`}
        />
        <MarketingPage />
      </>
    );
  }

  const metroCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Ahmedabad",
  ];

  const locationKeywords = metroCities
    .map(
      (city) =>
        `${courseData?.shortName} course in ${city}, online ${courseData?.shortName} ${city}, distance ${courseData?.shortName} ${city}, ${courseData?.course_type} in ${city}, ${universityData?.subtitle} ${city} center`
    )
    .join(", ");

  const hasSchoolLevelProgram = university?.hasSchoolLevelProgram;


  const [selectedCourseName, setSelectedCourseName] = useState("");

  useEffect(() => {
    if (!courseData?.degree_type) return;

    switch (courseData.degree_type.toLowerCase()) {

      case "bachelors":
      case "masters":
        setSelectedCourseName(courseData.shortName);
        break;

      case "ug certification":
      case "pg certification":
        setSelectedCourseName(courseData.course_name);
        break;

      case "pg diploma":
      case "ug diploma":
        setSelectedCourseName(courseData.course_name);
        break;

      default:
        setSelectedCourseName("");
    }

  }, [courseData]);

  return (
    <>
      <PageHead
        title={`${courseData?.course_type} ${selectedCourseName} in ${universityData?.subtitle} Admission ${currentYear}`}
        description={`Explore the ${courseData?.shortName} ${courseData?.course_type} program at ${universityData?.subtitle} for ${currentYear} admissions. Learn about fee structure, eligibility, application process, and how this UGC-approved course empowers your career with flexible online and distance education – available across top Indian cities.`}
        keywords={`${universityData?.subtitle} ${courseData?.shortName}, ${courseData?.shortName} online course ${universityData?.subtitle}, ${courseData?.course_type} admission ${currentYear}, ${courseData?.shortName} eligibility ${universityData?.subtitle}, UGC approved ${courseData?.shortName} course, online ${courseData?.shortName} degree, ${universityData?.subtitle} distance education, fees for ${courseData?.shortName} course, apply online ${courseData?.shortName} ${universityData?.subtitle}, ${locationKeywords}`}
        image={courseData?.course_image || "/images/vidya/logo/VR_logo2.png"}
        url={`https://vidyarishi.com/university/${universityData?.link}/${courseData?.course_link}`}


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
          name: `${courseData?.course_type} ${courseData?.shortName}`,
          description: `Explore the ${courseData?.shortName} ${courseData?.course_type} program at ${universityData?.subtitle}. Learn about fees, eligibility, UGC approval, and flexible online or distance learning options.`,
          provider: {
            "@type": "CollegeOrUniversity",
            name: universityData?.subtitle,
            sameAs: `https://vidyarishi.com/university/${universityData?.link}`,
            logo: {
              "@type": "ImageObject",
              url:
                universityData?.buildingImage ||
                "https://vidyarishi.com/images/vidya/logo/VR_logo2.png",
            },
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
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
          {
            (university?.hasSchoolLevelProgram
              ? (
                <UniSchoolLevelProgramMain
                  BigScreenLogic={BigScreenLogic}
                  UniversityData={universityData}
                  UniversitySlug={slug}
                  SubSlugCourseWithUniversity={subslug}
                />
              )
              : (
                <UniCourseMain
                  BigScreenLogic={BigScreenLogic}
                  UniversityData={universityData}
                  UniversitySlug={slug}
                  SubSlugCourseWithUniversity={subslug}
                />
              )
            )
          }


        </Context>
      </Provider>
    </>
  );
};


// Static Paths for SSG
export async function getStaticPaths() {
  const paths = [];

  AllUniversities?.AllUniversities?.forEach((uni) => {
    if (!uni?.link) return;

    //  Generate paths from courses
    uni.courses?.forEach((course) => {
      if (course?.course_link) {
        paths.push({
          params: {
            slug: String(uni.link),
            subslug: String(course.course_link),
          },
        });
      }
    });

    //  Generate paths from second array
    uni.schoollevelprogram?.forEach((course) => {
      if (course?.course_link) {
        paths.push({
          params: {
            slug: String(uni.link),
            subslug: String(course.course_link),
          },
        });
      }
    });

    // 3️⃣ Marketing Page
    if (uni.MarketingLink) {
      paths.push({
        params: {
          slug: String(uni.link),
          subslug: String(uni.MarketingLink),
        },
      });
    }
  });

  return {
    paths,
    fallback: "blocking",
  };
}


// Static Props for each University Page
export async function getStaticProps({ params }) {
  const { slug, subslug } = params;

  const university =
    AllUniversities?.AllUniversities?.find((u) => u?.link === slug) || null;

  if (!university) {
    return { notFound: true };
  }

  //  Match in the main courses array
  const matchInCourses =
    university.courses?.find((c) => c?.course_link === subslug) || null;

  //  Match in second array (Example: specialCourses)
  const matchInSpecial =
    university.schoollevelprogram?.find((c) => c?.course_link === subslug) || null;

  //  Check marketing page
  const isMarketingPage = university?.MarketingLink === subslug;

  // Final matched course (priority sequence)
  const course = matchInCourses || matchInSpecial || null;

  return {
    props: {
      university,
      course,
    },
    notFound: !course && !isMarketingPage,
    revalidate: 120,
  };
}


export default SubslugPage;
