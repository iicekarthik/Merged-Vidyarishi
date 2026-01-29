import { useScreenSize } from "@/hooks/screenSize";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

const UniCourseNavbar = ({ CourseDetails }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrollRef = useRef(null);

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = BigScreenLogic ? 400 : 600;
      setIsSticky(window.scrollY > threshold);

      // Jo section currently viewport me hai, usko active set karo
      const sections = [
        "CourseOverview",
        "CourseEligibilityDuration",
        "CourseSpecializations",
        "CourseSyallabus",
        "CourseTopUniversities",
        "CourseAdmissionProcess",
        "CourseCareerScope",
        "CourseFAQ",
      ];

      let currentSection = "";
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [screenSize, BigScreenLogic]);

  const scrollToSection = (id, offset = 80) => {
    const element = document.getElementById(id);
    if (element) {
      requestAnimationFrame(() => {
        const top =
          element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });

        // Smooth scroll complete hone ke baad active state update karo
        setTimeout(() => {
          setActiveSection(id);
        }, 500); // 500ms ka delay diya hai jo scrolling ke time ko consider karega
      });
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // console.log("CourseDetails", CourseDetails);

  return (
    <div
      className={`bg-primary ${isSticky ? "fixed-navbar" : ""}`}
      style={{
        position: isSticky ? "fixed" : "relative",
        top: isSticky ? (BigScreenLogic ? "78px" : "80px") : "0px",
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 11,
        // padding: "4px 0px",
        transition: "top 0.3s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Left Scroll Button */}
      {/* {BigScreenLogic ? (
        <div className="px-xxl-5 px-xl-5 px-2 py-xxl-1 py-xl-1 py-1">
          <button
            onClick={() => handleScroll("left")}
            // className="scroll-btn left-btn rounded-10"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // padding: "11px 12px",
              border: "none",
              fontWeight: "bolder",
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <i className="feather-arrow-left fs-4"></i>
          </button>
        </div>
      ) : (
        <div className="px-xxl-5 px-xl-5 px-2 py-xxl-1 py-xl-1 py-1">
          <button
            style={{
              padding: "11px 12px",
              border: "none",
              background: "none",
            }}
          ></button>
        </div>
      )} */}

      {/* Scrollable List */}
      <div
        ref={scrollRef}
        className="HideScrollBar"
        id="HideScrollBar"
        style={{
          overflowX: "scroll",
          whiteSpace: "nowrap",
        }}
      >
        <ul
          style={{
            width: "max-content",
            margin: "0 auto",
            // padding: "0 20px",
            display: "flex",
            rowGap: "20px",
            alignItems: "center",
          }}
          className="list-unstyled d-flex justify-content-center align-items-center flex-row mb-2"
        >
          {[
            { NavName: "Overview", NavLink: "CourseOverview" },
            {
              NavName: "Eligibility & Duration",
              NavLink: "CourseEligibilityDuration",
            },
            { NavName: CourseDetails?.degree_type !== "Certificate" && CourseDetails?.degree_type !== "Diploma" && CourseDetails?.degree_type !== "Postgraduate Diploma" && "Specialization", NavLink: "CourseSpecializations" },
            { NavName: "Syllabus", NavLink: "CourseSyallabus" },
            { NavName: CourseDetails?.degree_type !== "Certificate" && "Top Universities", NavLink: "CourseTopUniversities" },
            { NavName: "Admission Process", NavLink: "CourseAdmissionProcess" },
            { NavName: "Career Scope", NavLink: "CourseCareerScope" },
            { NavName: "FAQ", NavLink: "CourseFAQ" },
          ].map((items, index) => (
            <li
              key={index}
              style={{
                color: activeSection === items.NavLink ? "#800080" : "white", // Active section ke liye golden color
                fontWeight: "bolder",
                fontSize: "14px",
                whiteSpace: "nowrap",
                cursor: "pointer",
                padding: "5px 20px",
                transition: "color 0.3s ease-in-out",
                borderRadius: "5px",
                background: activeSection === items.NavLink ? "White" : "",
              }}
              onClick={() => scrollToSection(items?.NavLink, 80)}
            >
              {items?.NavName}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Scroll Button */}
      {/* {BigScreenLogic ? (
        <div className="px-xxl-5 px-xl-5 px-2 py-xxl-1 py-xl-1 py-1">
          <button
            onClick={() => handleScroll("right")}
            className="scroll-btn right-btn py-20 px-20 rounded-circle"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // padding: "11px 12px",
              border: "none",
              fontWeight: "bolder",
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <i className="feather-arrow-right fs-4"></i>
          </button>
        </div>
      ) : (
        <div className="px-xxl-5 px-xl-5 px-2 py-xxl-1 py-xl-1 py-1">
          <div className="px-xxl-5 px-xl-5 px-2 py-xxl-1 py-xl-1 py-1">
            <button
              style={{
                padding: "11px 12px",
                border: "none",
                background: "none",
              }}
            ></button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UniCourseNavbar;
