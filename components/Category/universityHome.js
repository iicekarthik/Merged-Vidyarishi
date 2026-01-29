"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import sal from "sal.js";
import Card from "../Cards/Card";
// import CourseDetails from "../../data/course-details/courseData.json";
// import CategoryData from "../../data/elements/category.json";
import AllUniversities from "../../data/vidya/University.json";

const UniversityHome = ({ Ourpartners, isUniversity }) => {
  // const [UniversityImages, setUniversityImages] = useState([
  //   {
  //     id: 1,
  //     shortName: "Online Amity",
  //     title: "Amity University",
  //     image: "/images/vidya/universities/03.png",
  //     NoCourses: "50",
  //     link: "amity-university",
  //   },
  //   {
  //     id: 2,
  //     shortName: "Online Manipal",
  //     title: "Manipal University",
  //     image: "/images/vidya/universities/01.png",
  //     NoCourses: "50",
  //     link: "manipal-university",
  //   },
  //   {
  //     id: 3,
  //     shortName: "SU",
  //     title: "Sharda University",
  //     image: "/images/vidya/universities/17.png",
  //     NoCourses: "50",
  //     link: "Sharda-University",
  //   },
  //   {
  //     id: 4,
  //     shortName: "DPU",
  //     title: "D.Y. Patil University",
  //     image: "/images/vidya/universities/18.png",
  //     NoCourses: "50",
  //     link: "DY-university",
  //   },
  //   {
  //     id: 5,
  //     shortName: "JU",
  //     title: "Jain University",
  //     image: "/images/vidya/universities/08.png",
  //     NoCourses: "50",
  //     link: "jain-university",
  //   },
  //   {
  //     id: 6,
  //     shortName: "Online NMIMS",
  //     title: "NMIMS SCHOOL",
  //     image: "/images/vidya/universities/02.png",
  //     NoCourses: "50",
  //     link: "nmims-university",
  //   },
  //   {
  //     id: 7,
  //     shortName: "Online LPU",
  //     title: "Lovely Professional University",
  //     image: "/images/vidya/universities/06.png",
  //     NoCourses: "50",
  //     link: "lovely-professional-university",
  //   },
  //   {
  //     id: 8,
  //     shortName: "DPU",
  //     title: "D.Y. Patil University",
  //     image: "/images/vidya/universities/19.png",
  //     NoCourses: "50",
  //     link: "DY-university",
  //   },

  //   {
  //     id: 9,
  //     shortName: "UPES",
  //     title: "University of Petroleum and Energy Studies",
  //     image: "/images/vidya/universities/15.png",
  //     NoCourses: "50",
  //     link: "university-of-petroleum-and-energy-studies",
  //   },
  //   {
  //     id: 10,
  //     shortName: "VGU",
  //     title: "Vivekananda Global University",
  //     image: "/images/vidya/universities/13.png",
  //     NoCourses: "50",
  //     link: "vivekananda-global-university",
  //   },
  //   {
  //     id: 11,
  //     shortName: "MU",
  //     title: "Mangalayatan University",
  //     image: "/images/vidya/universities/16.png",
  //     NoCourses: "50",
  //     link: "mangalayatan-university",
  //   },
  //   {
  //     id: 12,
  //     shortName: "SVSU",
  //     title: "Swami Vivekanand Subharti University",
  //     image: "/images/vidya/universities/14.png",
  //     NoCourses: "50",
  //     link: "swami-vivekanand-subharti-university",
  //   },
  // ]);

  const [ClickAbleCourse, setClickAbleCourse] = useState("");

  const HandleChangeCourse = (data) => {
    setClickAbleCourse(data);
  };

  useEffect(() => {
    sal({
      threshold: 0.01,
      once: true,
    });
  }, []);

  return (
    <>
      <main className="rbt-main-wrapper">
        <div className="rbt-categories-area bg-color-white ">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                Gap: "20px",
                width: "100%",
              }}
            >
              <div
                className=""
                style={{
                  //   border: "1px solid black",

                  height: "auto",
                  marginTop: "8px",
                  padding: "10px 0px",
                  textAlign: "center",
                }}
              >
                <Card
                  col="col-lg-2 col-md-4 col-sm-6 col-6"
                  isUniversity={isUniversity ? true : false}
                  Ourpartners={Ourpartners ? true : false}
                  maxItems3={Ourpartners ? 40 : 40}
                  // mt="mt--20"
                  categoryItems={
                    (AllUniversities && AllUniversities?.AllUniversities) || []
                  }
                  // title={"Online Course"}
                  // start={HomeOnlineCourse && 4}
                  // end={HomeOnlineCourse && 12}
                  // isDesc={true}
                  // isUser={true}
                />

                {/* <div
                  style={{
                    width: "180px",
                    height: "auto",
                    background: "pink",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <div>
                      <strong style={{ color: "black" }}>MBA</strong>
                    </div>
                    <h6>Masters Business Administrator</h6>
                    <div
                      style={{
                        padding: "0px",
                        margin: "0",
                        background: "purple",
                      }}
                    >
                      <strong>Online Course</strong>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UniversityHome;

{
  /* <div className="pricing-badge">
<span>Popular</span>
</div> */
}

// [
//   {
//     id: 7,
//     shortName: "LV",
//     title: "Lingaya's Vidyapeeth",
//     image: "/images/vidya/universities/07.png",
//     NoCourses: "50",
//     link: "lingaya-university",
//   },

//   {
//     id: 9,
//     shortName: "HU",
//     title: "Hindustan University",
//     image: "/images/vidya/universities/09.png",
//     NoCourses: "50",
//     link: "Hindustan-university",
//   },
//   {
//     id: 10,
//     shortName: "GLAU",
//     title: "GLA University",
//     image: "/images/vidya/universities/10.png",
//     NoCourses: "50",
//     link: "GLA-university",
//   },
//   {
//     id: 11,
//     shortName: "DPU",
//     title: "D.Y. Patil University",
//     image: "/images/vidya/universities/11.png",
//     NoCourses: "50",
//     link: "DY-university",
//   },
//   {
//     id: 12,
//     shortName: "DMI",
//     title: "DATTA MEGHE INSTITUTE",
//     image: "/images/vidya/universities/12.png",
//     NoCourses: "50",
//     link: "DATTA-university",
//   },
// ];
