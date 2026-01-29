import PageHead from "../Head";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";

import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import FooterThree from "@/components/Footer/Footer-Three";

import React from "react";

const Disclaimer = () => {
  return (
    <>
      <PageHead
        title="Disclaimer – Information Accuracy & Limitation of Liability | Vidyarishi"
        description="Read Vidyarishi’s disclaimer to understand our position on information accuracy, third-party links, and limitation of liability regarding our educational content and services."
        keywords="Vidyarishi disclaimer, information disclaimer, education platform terms, third-party links, content accuracy, legal disclaimer, limitation of liability"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/disclaimer"

     StructuredData = {{
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Disclaimer – Vidyarishi",
  url: "https://vidyarishi.com/disclaimer",
  description:
    "Official disclaimer for Vidyarishi covering information accuracy, third-party content, and liability limitations.",
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

          <div
            style={{
              padding: "20px",
              fontFamily: "Arial, sans-serif",
              lineHeight: "1.6",
              color: "#333",
              // backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start", // Fix: Start content from left
              textAlign: "justify",
              width: "90%", // Keeps it structured
              // maxWidth: "900px", // Prevents stretching on large screens
              margin: "35px auto", // Center the whole div horizontally
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
                color: "#2c3e50",
                marginBottom: "10px",
              }}
            >
              <i className="feather-alert-triangle"></i>
              <span style={{ marginLeft: "10px" }}>Disclaimer</span>
            </h1>
            {/* <p
        style={{
          fontSize: "1.5rem",
          // color: "#7f8c8e",
          marginBottom: "20px",
        }}
      >
        Comming Soon
      </p> */}

            <section style={{ marginTop: "20px", textAlign: "center" }}>
              <div
                style={{
                  // padding: "0px 120px",
                  textAlign: "justify",
                  marginBottom: "80px",
                }}
              >
                The information contained on this website is for providing
                unbiased, precise information and comparative guidance on
                institutions and their online program offerings for upskilling
                or higher education sought after by prospective learners. While
                we endeavor to keep the information up to date and correct, we
                make no representations or warranties of any kind, express or
                implied, about the completeness, accuracy, reliability,
                suitability, or availability with respect to the website or the
                information, admissions, services, related graphics, images,
                blogs, videos, university logos, and other material
                (collectively, “content”) contained on the website for any
                purpose. The Website, Mobile Application, and any information or
                content are provided on an “as is” and “as available” basis and
                are not to be substituted for in any form on offerings of its
                academic partners. No advice, recommendation(s), or information,
                whether oral or written, obtained by the user from Vidyarishi
                Educational Platform or through or from the services shall
                create any warranty by Vidyarishi Educational Platform.
                Vidyarishi Educational Platform reserves the right to feature
                your picture in any photos, videos, or other promotional
                material. Under no circumstances will Vidyarishi Educational
                Platform distribute or share your personal information with any
                third-party marketing database or disclose your personal
                information to any third party except on a case-to-case basis
                after proper verification of such third party or if required
                under any applicable law. There might be trademarks, logos, and
                brand names of other companies featured or referred to on the
                website (“Third Party IP”), and they are the property of their
                respective trademark holders. Use of these names, trademarks,
                and brands, or Third Party IP does not imply endorsement or
                infringement of intellectual property rights and/or associated
                rights. Testimonials, reviews, and success stories, including
                but not limited to course structure, college ratings,
                promotions, etc., appearing on the website are individual
                experiences reflecting the real-life experiences of those who
                have used our services, which may vary. We do not claim that
                they are typical results and/or experiences that users will
                generally achieve. Vidyarishi Educational Platform and its
                fraternity will not be liable for any use of any Vidyarishi
                Educational Platform content or any other information, data, or
                other material downloaded or otherwise obtained through or from
                the Website or Mobile Application, including errors or omissions
                and damages or losses resultant, if any, from the usage of its
                information.
              </div>
            </section>

            <footer
              style={{
                marginTop: "20px",
                borderTop: "1px solid #ccc",
                paddingTop: "15px",
                fontSize: "1rem", // Reduced for better readability
                // color: "#7f8c8d",
                width: "100%",
                textAlign: "center", // Centers the footer text
              }}
            >
              <p>
                If you have any questions about these Terms and Conditions,
                please contact us at{" "}
                <a
                  href="mailto:support@vidyarishi.com"
                  style={{
                    color: "#3498db",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  support@vidyarishi.com
                </a>
                .
              </p>
            </footer>
          </div>

          <Cart />

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default Disclaimer;
