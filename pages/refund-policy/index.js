// import React from "react";
import PageHead from "../Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import Store from "@/redux/store";
import RefundPolicyComp from "@/components/RefundPolicy/RefundPolicy";

const RefundPolicy = () => {
  return (
    <>
      <PageHead
        title="Refund Policy – Fair & Transparent Returns | Vidyarishi"
        description="Review Vidyarishi’s refund policy for courses and services. We ensure a fair and transparent process for cancellations and fee refunds in accordance with our terms."
        keywords="Vidyarishi refund policy, course refund, fee cancellation, education refund, payment reversal, refund guidelines, online education policy"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/refund-policy"
       
       
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Refund & Cancellation Policy – Vidyarishi",
          url: "https://vidyarishi.com/refund-policy",
          description:
            "Refund and cancellation terms for Vidyarishi online education services, including eligibility and request guidelines.",
          publisher: {
            "@type": "Organization",
            name: "Vidyarishi",
            logo: {
              "@type": "ImageObject",
              url: "https://vidyarishi.com/images/vidya/logo/VR_logo2.png"
            }
          }
        }
        }

      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />

          <RefundPolicyComp />

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default RefundPolicy;
