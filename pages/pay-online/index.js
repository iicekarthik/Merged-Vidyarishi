import React from "react";
import PageHead from "../Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import Store from "@/redux/store";
import PayOnlineComp from "@/components/PayOnline/PayOnline";

const PayOnline = () => {
  return (
    <>
      <PageHead
        title="Pay Online – Secure & Convenient Payments | Vidyarishi"
        description="Make secure and hassle-free online payments for your Vidyarishi courses. Fast, reliable, and fully encrypted payment gateway for a smooth experience."
        keywords="Vidyarishi payment, pay online, secure payment education, course fees online, online fee payment India, education fee gateway, UPI, credit card, Vidyarishi fees"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/pay-online"

        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Pay Online – Vidyarishi",
          url: "https://vidyarishi.com/pay-online",
          description:
            "Secure online payment portal for Vidyarishi courses with encrypted support for UPI, credit cards, debit cards, and net banking.",
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

          <PayOnlineComp />

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default PayOnline;
