import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import CourseDetails from "../../data/course-details/courseData.json";
import useCategoryCount from "@/context/useCategoryCount";
import { useState } from "react";

import AllUniversities from "../../data/vidya/University.json";
import { useScreenSize } from "@/hooks/screenSize";

const CategorySlider = ({ isCoursePage }) => {
  // const { categoryCounts } = useCategoryCount(CourseDetails.courseDetails);

  // const [UniversityImages, setUniversityImages] = useState([
  //   "/images/vidya/universities/01.png",
  //   "/images/vidya/universities/02.png",
  //   "/images/vidya/universities/03.png",
  //   "/images/vidya/universities/04.png",
  //   "/images/vidya/universities/05.png",
  //   "/images/vidya/universities/06.png",
  //   "/images/vidya/universities/07.png",
  //   "/images/vidya/universities/08.png",
  //   "/images/vidya/universities/09.png",
  //   "/images/vidya/universities/10.png",
  //   "/images/vidya/universities/11.png",
  //   "/images/vidya/universities/12.png",
  // ]);

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    <>
      <Swiper
        className="category-activation-one rbt-arrow-between icon-bg-gray gutter-swiper-30 ptb--20"
        style={{ zIndex: "", background: "#fff" }}
        slidesPerView={1}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".rbt-arrow-left",
          prevEl: ".rbt-arrow-right",
        }}
        autoplay={{
          delay: 1500, // Moves to the next slide every 1 seconds
          disableOnInteraction: false, // Keeps autoplay running after manual interactions
        }}
        breakpoints={{
          481: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {AllUniversities &&
          AllUniversities?.AllUniversities.slice(0, 40).map(
            (item, innerIndex) => {
              return (
                <SwiperSlide key={innerIndex}>
                  <div
                    className="single-slide"
                    style={{
                      marginTop: BigScreenLogic ? "" : "5px",
                      // display: "flex",
                      // justifyItems: "center",
                      // alignItems: "center",
                    }}
                  >
                    <button
                      className="rbt-cat-box rbt-cat-box-2 text-center flex flex-col items-center justify-center radius-6 mt-0 mb-0 ml-0 mr-0 pt-0 pb-0 pr-0 pl-0"
                      style={{
                        border: "none",
                        background: "none",
                        width: BigScreenLogic
                          ? "100%"
                          : "-webkit-fill-available",
                      }}
                    >
                      <div
                        className={
                          isCoursePage
                            ? ""
                            : "shadow-lg inner flex items-center justify-center"
                        }
                      >
                        <div className={isCoursePage ? " " : "icons radius-10"}>
                          <Image
                            src={item?.image}
                            width={BigScreenLogic ? 200 : 400}
                            height={BigScreenLogic ? 50 : 80}
                            className={isCoursePage ? "shadow" : ""}
                            style={{
                              objectFit: "contain",
                              width: BigScreenLogic ? "100%" : "",
                            }}
                            priority
                            alt={item?.title}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </SwiperSlide>
              );
            }
          )}

        {/* {CourseDetails &&
          CourseDetails.courseDetails.slice(0, 8).map((item, innerIndex) => {
            const count = categoryCounts[item.category] || 0;

            return (
              <SwiperSlide key={innerIndex}>
                <div className="single-slide">
                  <Link
                    className="rbt-cat-box rbt-cat-box-2 text-center"
                    rel="preload"
                    as="fetch"
                    href={`/course-filter-one-toggle/${item.category}`}
                  >
                    <div className="inner">
                      <div className="icons">
                        <Image
                          src={item.cateSmallImg}
                          width={80}
                          height={80}
                          priority
                          alt="Icons Images"
                        />
                      </div>
                     <div className="content">
                        <h6 className="title">{item.category}</h6>
                        <div className="read-more-btn">
                          <span className="rbt-btn-link">
                            {count} Course{count !== 1 ? "s" : ""}
                            <i className="feather-arrow-right"></i>
                          </span>
                        </div>
                      </div> 
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })} */}

        {/* <div className="rbt-swiper-arrow rbt-arrow-left">
          <div className="custom-overfolow">
            <i className="rbt-icon feather-arrow-left"></i>
            <i className="rbt-icon-top feather-arrow-left"></i>
          </div>
        </div> */}

        {/* <div className="rbt-swiper-arrow rbt-arrow-right">
          <div className="custom-overfolow">
            <i className="rbt-icon feather-arrow-right"></i>
            <i className="rbt-icon-top feather-arrow-right"></i>
          </div>
        </div> */}
      </Swiper>
    </>
  );
};

export default CategorySlider;
