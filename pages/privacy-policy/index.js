import React from "react";
import PageHead from "../Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import Store from "@/redux/store";
import PrivacyAndPolicy from "@/components/PrivacyAndPolicy/PrivacyAndPolicy";

const PrivacyPolicy = () => {
  return (
    <>
      <PageHead
        title="Privacy Policy – Your Data, Our Commitment | Vidyarishi"
        description="Learn how Vidyarishi protects your personal data. Our privacy policy explains how we collect, use, and safeguard your information in compliance with data regulations."
        keywords="Vidyarishi privacy policy, data protection, user data, personal information safety, online education privacy, GDPR, data security"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/privacy-policy"

        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy – Vidyarishi",
          url: "https://vidyarishi.com/privacy-policy",
          description:
            "Vidyarishi Privacy Policy explains data collection, usage, protection, and user rights for online education services.",
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

          <PrivacyAndPolicy />

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default PrivacyPolicy;
