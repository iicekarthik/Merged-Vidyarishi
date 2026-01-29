// import React from "react";
import PageHead from "../Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import Store from "@/redux/store";
import TermsConditions from "@/components/termAndCondition/TermsAndConditions";

const TermsAndConditions = () => {
  return (
    <>
      <PageHead
        title="Terms & Conditions – Vidyarishi"
        description="Read the terms and conditions for using Vidyarishi’s online education platform. Learn about user responsibilities, legal rights, and service limitations."
        keywords="Vidyarishi terms, terms and conditions, user agreement, online education terms, Vidyarishi policies, digital learning terms"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/terms-and-conditions"

        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms & Conditions – Vidyarishi",
          url: "https://vidyarishi.com/terms-and-conditions",
          description:
            "Official Terms & Conditions for using Vidyarishi services, website, and online educational resources.",
          publisher: {
            "@type": "Organization",
            name: "Vidyarishi",
            logo: {
              "@type": "ImageObject",
              url: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png"
            }
          }
        }}

      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />

          <TermsConditions />

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default TermsAndConditions;
