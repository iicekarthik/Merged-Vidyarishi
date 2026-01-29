import Context from "@/context/Context";
import { Provider } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import Store from "@/redux/store";

import About from "@/components/Abouts/About";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import PageHead from "@/pages/Head";
import BackToTop from "@/pages/backToTop";
import FooterThree from "@/components/Footer/Footer-Three";
import CallToActionSix from "@/components/Call-To-Action/CallToAction-Six";
import Separator from "@/components/Common/Separator";
import Banner2 from "@/components/About-Us-02/Banner";
import ServiceSaven from "@/components/Services/Service-Saven";
import ServiceSix from "@/components/Services/Service-Six";
import ServiceThree from "@/components/Services/Service-Three";

const AboutUsPage = () => {
  return (
    <>
      <PageHead
        title="About Us – Vidyarishi | Learn Anytime, Anywhere"
        description="Discover Vidyarishi's mission to deliver quality online education across India. Learn about our vision, values, and commitment to accessible learning."
        keywords="Vidyarishi about, about Vidyarishi, Vidyarishi about us, about us Vidyarishi, online education platform India, educational mission, e-learning company, digital learning in India, education technology, remote learning vision"
        image="/images/vidya/logo/VR_logo2.png"
        url="https://vidyarishi.com/about"

        ogData={{
          title: "About Us – Vidyarishi | Learn Anytime, Anywhere",
          description:
            "Discover Vidyarishi's mission to deliver quality online education across India.",
          url: "https://vidyarishi.com/about",
          image: "/images/vidya/logo/VR_logo2.png",
          type: "website",
        }}

        twitterData={{
          card: "summary_large_image",
          title: "About Us – Vidyarishi | Learn Anytime, Anywhere",
          description:
            "Discover Vidyarishi's mission to deliver quality online education across India.",
          image: "/images/vidya/logo/VR_logo2.png",
        }}

      />

      <Provider store={Store}>
        <Context>
          <div>
            <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
            <MobileMenu />
            <div
              style={{ marginTop: "-40px" }}
              className="rbt-about-area about-style-1 bg-color-white rbt-section-gapTop"
            >
              <ParallaxProvider>
                <About />
              </ParallaxProvider>
            </div>
            <div className="rbt-banner-area rbt-banner-8 variation-02">
              <div className="container">
                <Banner2 />
              </div>
            </div>

            <div
              className="rbt-service-area bg-color-white rbt-section-gap "
              style={{ marginTop: "-60px" }}
            >
              <ServiceSaven isTitle={true} />
            </div>
            <div className="rbt-service-area bg-color-extra2 rbt-section-gap">
              <ServiceSix />
            </div>

            <div className="rbt-service-area bg-color-white rbt-section-gap">
              <ServiceThree />
            </div>

            {/* <div className="rbt-service-area bg-color-white rbt-section-gap">
              <ServiceFive />
            </div> */}
            {/* 
            <div className="rbt-rbt-card-area bg-color-extra2 rbt-section-gap">
              <ServiceTwelve />
            </div> */}

            <div className="rbt-call-to-action-area rbt-section-gap bg-gradient-8">
              <div className="rbt-callto-action rbt-cta-default style-6">
                <CallToActionSix />
              </div>
            </div>

            <Separator />
            <BackToTop />
            <FooterThree />
          </div>
        </Context>
      </Provider>
    </>
  );
};

export default AboutUsPage;

/*
          <div>
            <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
            <MobileMenu />
            {/* <Cart />

            <div
              className="slider-area rbt-banner-10 height-750 bg_image bg_image--11"
              data-black-overlay="5"
            >
              <Banner />
            </div> 
            <div className="rbt-about-area about-style-1 bg-color-white rbt-section-gapTop">
              <ParallaxProvider>
                <About />
              </ParallaxProvider>
            </div>
            <div className="rbt-video-area rbt-section-gapBottom pt--50 bg-color-white">
              <div className="container">
                <SplitTwo isImg={false} />
              </div>
            </div> 
             <div className="rbt-testimonial-area bg-color-white rbt-section-gapBottom overflow-hidden">
              <div className="container-fluid">
                <div className="row g-5 align-items-center">
                  <div className="col-xl-3">
                    <div className="section-title pl--100 pl_md--30 pl_sm--0">
                      <span className="subtitle bg-pink-opacity">
                        Learners Feedback
                      </span>
                      <h2 className="title">What Our Learners Say</h2>
                      <p className="description mt--20">
                        Learning communicate to global world and build a bright
                        future with our histudy.
                      </p>
                      <div className="veiw-more-btn mt--20">
                        <Link
                          className="rbt-btn btn-gradient rbt-marquee-btn marquee-text-y"
                          href="#"
                        >
                          <span data-text="Marquee Y">Contact Us</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <TestimonialSix />
                </div>
              </div>
            </div> 
            <Teacher /> 
             <div className="rbt-newsletter-area newsletter-style-2 bg-color-primary rbt-section-gap">
              <NewsletterTwo />
            </div> 

            <BackToTop />
             <FooterOne /> 
          </div>
          <div>******************************************************************************* Below About 2 **********************************************************************</div>
          <div>
            <div className="rbt-banner-area rbt-banner-8 variation-02">
              <div className="container">
                <Banner2 />
              </div>
            </div>

            <Video />

            <div className="rbt-about-area about-style-1 bg-color-white rbt-section-gap">
              <div className="container">
                <AboutSix
                  btnClass="radius rbt-marquee-btn marquee-text-y"
                  btnText="Learn More"
                />
              </div>
            </div>
            <div className="rbt-call-to-action-area rbt-section-gap bg-gradient-8">
              <div className="rbt-callto-action rbt-cta-default style-6">
                <CallToActionSix />
              </div>
            </div>
            <div className="rbt-rbt-card-area bg-color-extra2 rbt-section-gap">
              <ServiceTwelve />
            </div>
            <div className="rbt-team-area bg-gradient-8 rbt-section-gap">
              <TeamTen />
            </div>
            <div className="rbt-brand-area bg-color-white rbt-section-gap">
              <BrandThree />
            </div>
            <Separator />
            <BackToTop />
            <FooterThree />
          </div>




*/
