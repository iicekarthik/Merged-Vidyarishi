import React, { useEffect } from "react";
import Link from "next/link";
import Typed from "typed.js";

import AboutData from "../../data/elements/about.json";
import { useAppContext } from "@/context/Context";

const Banner = () => {
  const { isOpen, setIsOpen } = useAppContext();

  useEffect(() => {
    const typeitInstance = new Typed(".is-visible", {
      strings: ["Courses.", "Universities.", "Planning.", "Process."],
      typeSpeed: 80,
      backSpeed: 60,
      startDelay: 300,
      loop: Infinity,
      showCursor: false,
    });

    return () => {
      typeitInstance.destroy();
    };
  }, []);

  return (
    <>
      <div className="row g-5 align-items-center">
        <div className="col-lg-10 offset-lg-1">
          <div className="content">
            <div className="inner text-center">
              <div className="rbt-new-badge rbt-new-badge-one">
                <span className="rbt-new-badge-icon">🏆</span> It's Time For
                Career
              </div>

              <h1 className="title">
                Know About Our
                <span className="header-caption ms-2">
                  <span className="cd-headline clip is-full-width">
                    <span className="cd-words-wrapper">
                      <b className="is-visible theme-gradient"></b>
                    </span>
                  </span>
                </span>
              </h1>
              <p className=" has-medium-font-size mt--20">
                {/* Dive in and learn React.js from scratch! Learn Reactjs, Hooks,
                Redux, React Routing, Animations, Next.js and way more! */}
                Vidyarishi is a premier online education platform offering
                expert-led, industry-focused learning. We leverage advanced
                technology to deliver accessible, high-quality education,
                empowering learners with the skills needed for career success.
              </p>

              <div className="slider-btn rbt-button-group justify-content-center">
                <button
                  className="rbt-btn btn-gradient hover-icon-reverse"
                  onClick={()=>setIsOpen(true)}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Enquire Now</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </span>
                </button>
                <Link
                  className="rbt-btn hover-icon-reverse btn-white"
                  href="/contact"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Contact US</span>
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
      </div>
    </>
  );
};

export default Banner;

{
  /* <div
style={{
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  width: "100%",
}}
>
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px",
    // width: "100%",
    // maxWidth: "1200px",
    // padding: "20px",
  }}
>
  {AboutData.aboutOne.map((data, index) => (
    <div
      key={index}
      style={{
        flex: "1 50%",
        // minWidth: "300px",
        // maxWidth: "500px",
      }}
    >
      <div
        style={{
          padding: "24px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          width : '100%',
          gap: "16px"
        }}
      >
        {data.children.map((item, innerIndex) => (
          <div
            key={innerIndex}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: "50%",
                backgroundColor: item.isPrimary
                  ? "rgba(0, 123, 255, 0.1)"
                  : "rgba(255, 105, 180, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                className={item.icon}
                style={{
                  fontSize: "24px",
                  color: item.isPrimary ? "#007bff" : "#ff69b4",
                }}
              ></i>
            </div>
            <div>
              <h6
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0",
                }}
              >
                {item.title}
              </h6>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  margin: "4px 0 0",
                }}
              >
                {item.info}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
</div> */
}
