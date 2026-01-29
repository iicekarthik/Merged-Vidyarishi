import { useEffect, useState } from "react";
import Link from "next/link";
import sal from "sal.js";
import CategoryOne from "../Category/CategoryOne";
import MainDemoBanner from "./MainDemoBanner";
import Card from "../Cards/Card";
import AboutTwo from "../Abouts/About-Two";
import CallToAction from "../Call-To-Action/CallToAction";
import Counter from "../Counters/Counter";
import TestimonialSeven from "../Testimonials/Testimonial-Seven";
import EventCarouse from "../Events/EventCarouse";
import TeamTwo from "../Team/TeamTwo";
import BlogGridTop from "../Blogs/Blog-Sections/BlogGrid-Top";

import BlogData from "../../data/blog/blog.json";
import NewsletterTwo from "../Newsletters/Newsletter-Two";
import { ParallaxProvider } from "react-scroll-parallax";
import CategorySlider from "../Category/CategoriesSlider";
import CourseHome from "../Category/CourseHome";
import AccordionThree from "../Accordions/Accordion-Three";
import TeamEight from "../Team/TeamEight";
import CategoryTwo from "../Category/CategoryTwo";
import EventList from "@/components/Events/Events";
import EventData from "../../data/events.json";
import TeamHead from "../Team/TeamHead";
import Image from "next/image";
// import ContactVideo from "../../public/video/contact.mp4";
import Talk from "../../public/images/vidya/questions/talk.png";
import CategoryThreeSlider from "../Category/CategoryThreeSlider";
import UniversityHome from "../Category/universityHome";

import HowWorkImage from "../../public/images/vidya/work/HowWork.png";
import HowWeWork from "../Work";
import PopupForm from "../PopupForm/PopupForm";
import { useAppContext } from "@/context/Context";

const MainDemo = () => {
  useEffect(() => {
    sal({
      threshold: 0.01,
      once: true,
    });
  }, []);

  const { isOpen, setIsOpen } = useAppContext();

  // const [ShowPopup, setShowPopup] = useState(false);

  // useEffect(() => {
  //   setShowPopup(true);
  //   setTimeout(() => {
  //     setShowPopup(true);
  //   }, 4000);
  // });

  return (
    <>
      <main className="rbt-main-wrapper">
        {/* slide 1 */}
        <div className="rbt-banner-area rbt-banner-1">
          <MainDemoBanner />
        </div>
        {/* slide 2 */}
        <div
          className="rbt-categories-area bg-color-white pb-10"
          style={{ marginTop: "-130px" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12"></div>
            </div>
            <div className="row g-5 mt--5">
              <div
                className="section-title text-center"
                style={{ zIndex: "1" }}
              >
                <span className="subtitle bg-primary-opacity">
                  TOP UNIVERSITIES
                </span>
                {/* <h4 className="title">Top Universities</h4> */}
              </div>

              <div className="mt--30">
                <CategorySlider />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="section-title text-center mt--20"
            // style={{ zIndex: "11" }}
          >
            <TeamHead
              isTheme={"theme"}
              // subTitle="Top Courses"
              title="Explore "
              Jointtitle={"Popular Courses"}
              desc={[
                "Explore top-tier bachelor's, master's, diploma, and certificate programs from renowned universities.",
                "Find the perfect course to advance your career, upskill with confidence, and unlock your full potential.",
              ]}
              isPurpuleHeading1={true}
            />
          </div>
          <CourseHome />
        </div>
        {/* <div className="rbt-categories-area bg-color-white rbt-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h5 className="title">Style One</h5>
                </div>
              </div>
            </div>
            <div className="row g-5 mt--30">
              <CategoryOne />
            </div>
          </div>
        </div> */}
        {/* slide 3 - questions we can help */}
        <div className="rbt-categories-area bg-color-extra2 pt--30 pb--20">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <TeamHead
                    isTheme={"theme1"}
                    subTitle="Need Assistance?"
                    title="Have Questions? "
                    Jointtitle={"We're Here to Help"}
                    desc={[
                      "Discover leading master's and bachelor's programs from prestigious universities.",
                      "Choose the right course to reach your goals and realize your true potential.",
                    ]}
                    isPurpuleHeading1={true}
                  />
                </div>
              </div>
            </div>
            <div className="row g-5 mb--30" style={{ marginLeft: "4.5px" }}>
              <CategoryTwo />
            </div>
          </div>
        </div>
        {/* Slide 4 - university */}.
        <div className="container mt--10 mb--80">
          <div className="row">
            <TeamHead
              isTheme={"theme1"}
              subTitle="Explore Top-Ranked Universities"
              BeforeJointtitle={"Discover Top "}
              title="Leading Universities"
              Jointtitle={""}
              desc={[
                "We Offer world-class education, cutting-edge research, and unparalleled opportunities for personal and professional growth.",
                "Explore a diverse range of universities renowned for their excellence in academic programs, innovative teaching methodologies, and global recognition.",
              ]}
              isPurpuleHeading1={true}
            />
          </div>

          <div className="row" style={{ marginTop: "-40px" }}>
            <div className="col-lg-12">
              {/* <CategoryThreeSlider /> */}
              <UniversityHome isUniversity={true} />

              <div className="d-flex justify-content-center mt-4">
                <Link href={"our-partners"} className="rbt-btn3 btn-pink">
                  View More Universities
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* slide 5 - Right Guidence With Our Experts */}
        {/* <div className="rbt-team-area bg-color-extra2 pt--30 pb--80">
          <TeamEight />
        </div> */}
        {/* Slide 6 - How It Is Work */}
        <div className="rbt-counterup-area  rbt-section-gapBottom">
          <div className="container">
            <TeamHead
              isTheme={"theme1"}
              subTitle="What We Offer"
              title="How "
              Jointtitle={"Does It Work?"}
              desc={[
                "Answer a few easy questions and find the perfect online university tailored to your needs—anytime, anywhere.",
              ]}
              isPurpuleHeading1={true}
            />
            {/* <EventList
              isPagination={false}
              // parentClass="card-list-2 event-list-card"
              childClass="col-lg-3 col-md-3 col-12"
              getEvents={EventData}
              end={4}
            /> */}
            {/* <Image src={HowWorkImage} width={1391} height={166} /> */}
            <HowWeWork />
          </div>
        </div>
        {/* Slide 7 - FAQ */}
        <div className="rbt-accordion-area bg-color-extra2 rbt-section-gapBottom">
          <AccordionThree />
        </div>
        {/* Slide 8 - TALK TO EXPERT */}
        <div className="rbt-accordion-area accordion-style-1 rbt-section-gap pb--60 pt--30">
          <div className="col-lg-12 col-md-12 col-12 pb--10 d-flex justify-content-center align-items-center p--40 flex-wrap">
            <div
              // className="pl--40"
              style={{ fontSize: "14px", padding: "0px 40px" }}
              // style={{ flex: "1 1 400px", minWidth: "300px" }}
            >
              <div>
                <h4>
                  Have Any{" "}
                  <span style={{ color: "#800080", fontWeight: "bold" }}>
                    Doubts
                  </span>
                  <span
                    style={{
                      color: "#800080",
                      fontSize: "44px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    ?
                  </span>
                </h4>
                <h2>
                  <span style={{ color: "#800080", fontWeight: "bold" }}>
                    Talk
                  </span>{" "}
                  To <br />
                  <span style={{ color: "#800080", fontWeight: "bold" }}>
                    Our Experts
                  </span>
                </h2>
                <h6>
                  chat, call, or video. We’re here to offer counseling in the
                  way that works for you.
                </h6>
              </div>

              <div
                className="d-flex justify-content-start justify-content-xl-start justify-content-xxl-start align-items-xl-center  align-items-xxl-center flex-xxl-row flex-xl-row flex-column"
                style={{
                  gap: "15px",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                    flexDirection: "column",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#b966e7",
                      padding: "10px 20px",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      borderRadius: "5px",
                      cursor: "pointer",
                      border: "none",
                      color: "white",
                      fontWeight: "bolder",
                    }}
                    onClick={() => setIsOpen(true)}
                  >
                    <i
                      className="feather-video"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Schedule Video Call
                  </button>
                  <button
                    onClick={() => setIsOpen(true)}
                    style={{
                      backgroundColor: "#b966e7",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      border: "none",
                      color: "white",
                      fontWeight: "bolder",
                    }}
                  >
                    <i
                      className="feather-help-circle"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Ask Queries
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                    flexDirection: "column",
                    flexWrap: "wrap",
                  }}
                >
                  <Link
                    target="_blank"
                    href={
                      "https://wa.me/919619535535?text=Hello%20Vidyarishi%20"
                    }
                    style={{
                      backgroundColor: "#b966e7",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      border: "none",
                      color: "white",
                      fontWeight: "bolder",
                    }}
                  >
                    <i
                      className="feather-message-circle"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Live Chat Support
                  </Link>
                  <button
                    onClick={() => setIsOpen(true)}
                    style={{
                      backgroundColor: "#b966e7",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      border: "none",
                      color: "white",
                      fontWeight: "bolder",
                    }}
                  >
                    <i
                      className="feather-phone-call  "
                      style={{ marginRight: "10px" }}
                    ></i>
                    Request Call Back
                  </button>
                </div>
              </div>
            </div>

            <div
              className="col-lg-2 col-md-2 col-2 d-sm-none d-none d-lg-none d-xxl-block d-xl-block"
              style={{
                flex: "1 1 1",
                minWidth: "450px",
                textAlign: "center",
              }}
            >
              {/* <Image
                src={Talk}
                alt="Talk to Our Experts"
                style={{ width: "100%", height: "auto", maxWidth: "500px" }}
              /> */}
              <video
                // src={"../../public/vidya/video/contact.mp4"}
                src={"/video/contact.mp4"}
                style={{ width: "100%", height: "auto" }}
                // controls
                autoPlay
                muted
                loop
              />
            </div>
          </div>
        </div>
        {/* Slide 8 Talk To Expert */}
        {/* <div className="rbt-course-area bg-color-extra2 rbt-section-gap">
          <div className="container">
            <div className="row mb--60">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle bg-secondary-opacity">
                    Top Popular Course
                  </span>
                  <h2 className="title">
                    Histudy Course student <br /> can join with us.
                  </h2>
                </div>
              </div>
            </div>
            <div className="row row--15">
              <Card
                col="col-lg-4 col-md-6 col-sm-6 col-12"
                mt="mt--5"
                start={0}
                end={3}
                isDesc={true}
                isUser={true}
              />
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="load-more-btn mt--60 text-center">
                  <Link
                    className="rbt-btn btn-gradient btn-lg hover-icon-reverse"
                    href="#"
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Load More Course (40)</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="rbt-about-area bg-color-white rbt-section-gapTop pb_md--80 pb_sm--80 about-style-1">
          <div className="container">
            <ParallaxProvider>
              <AboutTwo />
            </ParallaxProvider>
          </div>
        </div> */}
        {/* <div className="rbt-callto-action-area mt_dec--half">
          <CallToAction />
        </div> */}
        {/* <div className="rbt-counterup-area bg-color-extra2 rbt-section-gapBottom default-callto-action-overlap">
          <div className="container">
            <Counter isDesc={false} />
          </div>
        </div> */}
        {/* <div className="rbt-testimonial-area bg-color-white rbt-section-gap overflow-hidden">
          <div className="wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center mb--10">
                    <span className="subtitle bg-primary-opacity">
                      EDUCATION FOR EVERYONE
                    </span>
                    <h2 className="title">
                      People like histudy education. <br /> No joking - here’s
                      the proof!
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TestimonialSeven />
        </div> */}
        {/* <div className="rbt-event-area rbt-section-gap bg-gradient-3">
          <div className="container">
            <div className="row mb--55">
              <div className="section-title text-center">
                <span className="subtitle bg-white-opacity">
                  STIMULATED TO TAKE PART IN?
                </span>
                <h2 className="title color-white">Upcoming Events</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <EventCarouse />
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="rbt-team-area bg-color-white rbt-section-gap">
          <div className="container">
            <div className="row mb--60">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle bg-primary-opacity">
                    Our Teacher
                  </span>
                  <h2 className="title">Whose Inspirations You</h2>
                </div>
              </div>
            </div>
            <TeamTwo />
          </div>
        </div> */}
        {/* <div className="rbt-rbt-blog-area rbt-section-gap bg-color-extra2">
          <div className="container">
            <div className="row g-5 align-items-center mb--30">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="section-title">
                  <span className="subtitle bg-pink-opacity">Blog Post</span>
                  <h2 className="title">Post Popular Post.</h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="read-more-btn text-start text-md-end">
                  <Link
                    className="rbt-btn btn-gradient hover-icon-reverse"
                    href="/blog"
                  >
                    <div className="icon-reverse-wrapper">
                      <span className="btn-text">See All Articles</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <BlogGridTop BlogData={BlogData} />
          </div>
        </div> */}
        {/* <div className="rbt-newsletter-area newsletter-style-2 bg-color-primary rbt-section-gap">
          <NewsletterTwo />
        </div> */}
        <PopupForm TimeOutSeconds={2000} />
      </main>
    </>
  );
};

export default MainDemo;
