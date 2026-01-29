// pages/[slug].js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PageHead from "./Head";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import AllUniversities from "@/data/vidya/University.json";

import { useScreenSize } from "@/hooks/screenSize";
import Loader from "@/components/Common/Loader";
import UniversityMain from "@/components/University/UniversityMain";
import ErrorPage from "./404";

// Helper function to safely check content existence
const checkUniversitySections = (university) => {
  if (!university) return {};

  const hasMastersSpecialization = university?.courses?.some(
    (course) =>
      course?.degreeType === "Masters Degree" &&
      course?.specialization?.length > 0
  );

  return {
    hasAbout: university?.courses?.length > 0,
    hasAccredation: university?.accredation?.length > 0,
    hasCourses: university?.about1 && university?.about2 && university.courses.length > 0,
    hasMastersSpecialization,
    hasCompanyDetails: university?.hiringPartners?.companiesDetails?.length > 0,
    hasAdvantages: university?.advantages?.keyPoints?.length > 0,
    hasSampleCertificate: !!university?.sampleCertificate?.certificate,
    hasExamPattern:
      university?.examPattern?.examTitle &&
      university?.examPattern?.about1 &&
      university?.examPattern?.onlineExamProcess?.length > 0,
    hasAdmissionProcess: university?.admissionProcess?.length > 0,
    hasFaculty: university?.faculty?.length > 0,
    hasFAQ: university?.faq?.length > 0,
  };
};

const UniversitySlug = ({ university }) => {
  const router = useRouter();
  const { slug } = router.query;
  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);
  const currentYear = new Date().getFullYear();

  const [sectionFlags, setSectionFlags] = useState({});
  const [hasAnySection, setHasAnySection] = useState(false);

  useEffect(() => {
    if (!university) return;

    const flags = checkUniversitySections(university);
    setSectionFlags(flags);
    setHasAnySection(Object.values(flags).some(Boolean));
  }, [university]);

  if (router.isFallback) return <Loader />;

  if (!university) return <ErrorPage />;

  return (
    <>
      <PageHead
        title={`${university?.subtitle} – ${currentYear} Admissions Open`}
        description={`Admissions are now open for ${currentYear} at ${university?.subtitle}, one of India’s top UGC-approved institutions for online and distance learning.`}
        keywords={`UGC approved university India, ${university?.subtitle} online degrees, distance education ${university?.subtitle}, ${currentYear} admissions open, ${university?.subtitle} courses list`}
        image={university?.logo || "/images/vidya/logo/VR_logo2.png"}
        url={`https://vidyarishi.com/university/${university?.link}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "University",
          headline: university.subtitle,
          description: university.shortDescription,
          image: university.buildingImage,
          author: {
            "@type": "Person",
            name: "Vidyarishi",
          },
          publisher: {
            "@type": "Organization",
            name: "Vidyarishi",
            logo: {
              "@type": "ImageObject",
              url: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png",
            },
          },
          mainEntityOfPage: `https://vidyarishi.com/${university.link}`,
        }}
      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <UniversityMain
            BigScreenLogic={BigScreenLogic}
            screenSize={screenSize}
            university={university}
            slug={slug}
            hasAnySection={hasAnySection}
            {...sectionFlags}
          />
        </Context>
      </Provider>
    </>
  );
};

// Static Paths for SSG
export async function getStaticPaths() {
  const paths = AllUniversities?.AllUniversities.map((uni) => ({
    params: { slug: uni.link },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

// Static Props for each University Page
export async function getStaticProps({ params }) {
  const { slug } = params;
  const university =
    AllUniversities?.AllUniversities.find((uni) => uni.link === slug) || null;

  return {
    props: { university },
    revalidate: 60,
  };
}

export default UniversitySlug;
