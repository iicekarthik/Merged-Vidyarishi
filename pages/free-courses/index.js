import React from "react";
import PageHead from "../Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import Store from "@/redux/store";
import FreeCoursesComp from "@/components/freeCourses/freeCoursesComp";

const freeCourses = () => {
  return (
    <>
      <PageHead
        title="Free Online Courses by Vidyarishi – Learn Anytime, Without Limits"
        description="Access high-quality free online courses from Vidyarishi. Learn in-demand skills, explore new subjects, and grow your career without spending a rupee."
        keywords="free online courses, Vidyarishi free learning, no cost education, skill development free, online learning India, free certification courses, distance education"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/free-courses"


        structuredData={{
          "@context": "https://schema.org",
          "@type": "CourseCatalog",
          name: "Vidyarishi Free Online Courses",
          description:
            "A collection of 100% free online courses offered by Vidyarishi to help learners build skills and grow professionally.",
          provider: {
            "@type": "Organization",
            name: "Vidyarishi",
            url: "https://vidyarishi.com",
            logo: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png",
          }
        }}
      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />

          <FreeCoursesComp />

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default freeCourses;
