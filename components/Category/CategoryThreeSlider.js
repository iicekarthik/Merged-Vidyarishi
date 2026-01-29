"use client";
import Image from "next/image";
import Link from "next/link";

import CourseDetails from "../../data/course-details/courseData.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import useCategoryCount from "@/context/useCategoryCount";
import { useState } from "react";

const CategoryThreeSlider = () => {
  const { categoryCounts } = useCategoryCount(CourseDetails.courseDetails);

  const [UniversityImages, setUniversityImages] = useState([
    {
      id : 1,
      shortName : "Online Manipal",
      title :"Manipal University",
      image : "/images/vidya/universities/01.png",
      NoCourses : "50",
    },
    {
      id : 2,
      shortName : "Online NMIMS",
      title :"NMIMS SCHOOL",
      image : "/images/vidya/universities/02.png",
      NoCourses : "50",
    },
    {
      id : 3,
      shortName : "Online Amity",
      title :"Amity University",
      image : "/images/vidya/universities/03.png",
      NoCourses : "50",
    },
    {
      id : 4,
      shortName : "Distance CU",
      title :"Chendigad University",
      image : "/images/vidya/universities/04.png",
      NoCourses : "50",
    },
    {
      id : 5,
      shortName : "Online CU",
      title :"Chendigad University",
      image : "/images/vidya/universities/05.png",
      NoCourses : "50",
    },
    {
      id : 6,
      shortName : "Online LPU",
      title :"Lovely Professional University",
      image : "/images/vidya/universities/06.png",
      NoCourses : "50",
    },
    {
      id : 7,
      shortName : "LV",
      title :"Lingaya's Vidyapeeth",
      image : "/images/vidya/universities/07.png",
      NoCourses : "50",
    },
    {
      id : 8,
      shortName : "JU",
      title :"Jain University",
      image : "/images/vidya/universities/08.png",
      NoCourses : "50",
    },
    {
      id : 9,
      shortName : "HU",
      title :"Hindustan University",
      image : "/images/vidya/universities/09.png",
      NoCourses : "50",
    },
    {
      id : 10,
      shortName : "GLAU",
      title :"GLA University",
      image : "/images/vidya/universities/10.png",
      NoCourses : "50",
    },
    {
      id : 11,
      shortName : "DPU",
      title :"D.Y. Patil University",
      image : "/images/vidya/universities/11.png",
      NoCourses : "50",
    },
    {
      id : 12,
      shortName : "DMI",
      title :"DATTA MEGHE INSTITUTE",
      image : "/images/vidya/universities/12.png",
      NoCourses : "50",
    },
  ]);

  return (
    <>
      <Swiper
        className="swiper category-activation-three rbt-arrow-between icon-bg-gray gutter-swiper-30 ptb--20"
        slidesPerView={1}
        modules={[Navigation]}
        navigation={{
          nextEl: ".rbt-arrow-left",
          prevEl: ".rbt-arrow-right",
        }}
        breakpoints={{
          480: {
            slidesPerView: 1,
          },
          481: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {UniversityImages &&
          UniversityImages.slice(0, 12).map((item, innerIndex) => {
            // const count = categoryCounts[item.category] || 0;
            return (
              <SwiperSlide className="swiper-wrapper" key={innerIndex}>
                <div className="swiper-slide">
                  <div className="single-slide">
                    <div className="rbt-cat-box rbt-cat-box-1 variation-2 text-center">
                      <div className="inner">
                        <div className="thumbnail">
                          <Link href={`/course-filter-one-toggle/${item?.id}`}>
                            <Image
                              src={item?.image}
                              width={204}
                              height={192}
                              priority
                              style={{objectFit : "contain"}}
                              className="inner2"
                              alt="Category Images"
                            />
                          </Link>
                        </div>

                        {/* <div className="icons">
                          <Image
                            src={item?.image}
                            width={40}
                            height={40}
                            priority
                            alt="Icons Images"
                          />
                        </div> */}

                        <div className="content">
                          <h5 className="title" style={{marginTop : "20px"}} >{item?.shortName}</h5>
                          <h6 className="title">
                            <Link
                              rel="preload"
                              as="fetch"
                              href={`/course-filter-one-toggle/${item}`}
                            >
                              {item?.title}
                            </Link>
                          </h6>
                          <div className="read-more-btn">
                            <Link
                              className="rbt-btn-link"
                              href={`/course-filter-one-toggle/${item.category}`}
                            >
                              {" "}
                              {/* {count} Course{count !== 1 ? "s" : ""} */}
                              View University
                              <i className="feather-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

        <div className="rbt-swiper-arrow rbt-arrow-left">
          <div className="custom-overfolow">
            <i className="rbt-icon feather-arrow-left"></i>
            <i className="rbt-icon-top feather-arrow-left"></i>
          </div>
        </div>

        <div className="rbt-swiper-arrow rbt-arrow-right">
          <div className="custom-overfolow">
            <i className="rbt-icon feather-arrow-right"></i>
            <i className="rbt-icon-top feather-arrow-right"></i>
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default CategoryThreeSlider;
