import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";

const courses = {
  UG: [
    { name: "B.Com", img: "/images/Marketing//courses/bcom.png", link: "https://vidyarishi.com/amity-university/bcom" },
    { name: "BA", img: "/images/Marketing//courses/ba.png", link: "https://vidyarishi.com/amity-university/ba" },
    { name: "BCA", img: "/images/Marketing//courses/bca.png", link: "https://vidyarishi.com/amity-university/bca" },
    { name: "BBA", img: "/images/Marketing//courses/bba.png", link: "https://vidyarishi.com/amity-university/bba" },
  ],
  PG: [
    { name: "MBA", img: "/images/Marketing//courses/mba.png", link: "https://vidyarishi.com/amity-university/mba" },
    { name: "MCA", img: "/images/Marketing//courses/mca.png", link: "https://vidyarishi.com/amity-university/mca" },
    { name: "MA", img: "/images/Marketing//courses/ma.png", link: "https://vidyarishi.com/amity-university/ma" },
    { name: "M.Com", img: "/images/Marketing//courses/mcom.png", link: "https://vidyarishi.com/amity-university/mcom" },
    { name: "M.Sc", img: "/images/Marketing//courses/msc.png", link: "https://vidyarishi.com/amity-university/msc" },
  ],
};

const Courses = () => {
  const [selected, setSelected] = useState("UG");

  return (
    <section id="course" className="courses-section">
      <div className="courses-container">
        {/* Heading */}
        <h3 className="courses-heading">Explore Our Online Degree Programs</h3>

        {/* UG/PG Filter Buttons */}
        <div className="courses-filter">
          <button
            onClick={() => setSelected("UG")}
            className={`filter-btn ${selected === "UG" ? "active" : ""}`}
          >
            UG PROGRAM
          </button>
          <button
            onClick={() => setSelected("PG")}
            className={`filter-btn ${selected === "PG" ? "active" : ""}`}
          >
            PG PROGRAM
          </button>
        </div>

        {/* Course Grid */}
        <div className="courses-grid">
          {courses[selected].map((course, idx) => (
            <div key={idx} className="course-card">
              {/* Course Image */}
              <img
                src={course.img}
                alt={course.name}
                className="course-img"
              />

              <h4 className="course-title">{course.name}</h4>
              <p className="course-desc">
                Enroll in Amity’s {course.name} program and enhance your career
                with flexible, industry-ready learning.
              </p>

              {/* Learn More button */}
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="course-btn"
              >
                <span>Learn More</span>
                <GoArrowRight className="icon" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
