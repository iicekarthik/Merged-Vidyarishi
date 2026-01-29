import React from "react";
import PageHead from "../Head";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import CareerPage from "@/components/CareerPage/CareerPage";

const career = () => {
  return (
    <>
      <PageHead
        title="Careers at Vidyarishi – Join the Mission to Transform Online Education"
        description="Explore exciting career opportunities at Vidyarishi. Join our passionate team and help revolutionize online learning and digital education in India."
        keywords="Vidyarishi careers, job openings, edtech jobs India, work at Vidyarishi, education technology, teaching online, remote jobs in education"
        url="https://vidyarishi.com/careers"
        image="/images/vidya/logo/VR_logo2.png"
        canonical="https://vidyarishi.com/careers"
        ogData={{
          title: "Careers at Vidyarishi – Join the Mission to Transform Online Education",
          description:
            "Explore exciting career opportunities at Vidyarishi and be part of India's digital education revolution.",
          image: "/images/vidya/logo/VR_logo2.png",
          url: "https://vidyarishi.com/careers",
          type: "website",
          siteName: "Vidyarishi",
        }}
        twitterData={{
          card: "summary_large_image",
          title: "Careers at Vidyarishi – Transform Online Education",
          description:
            "Join Vidyarishi and be part of a mission-led team driving digital learning in India.",
          image: "/images/vidya/logo/VR_logo2.png",
        }}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Careers at Vidyarishi",
          url: "https://vidyarishi.com/careers",
          description:
            "Explore exciting career opportunities at Vidyarishi and join a mission-led team shaping the future of online education.",
          publisher: {
            "@type": "Organization",
            name: "Vidyarishi",
            logo: {
              "@type": "ImageObject",
              url: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png",
            },
          },
        }}
      />


      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />

          <CareerPage />

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default career;
