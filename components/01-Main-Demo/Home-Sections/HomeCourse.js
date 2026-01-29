import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import image from "@/public/images/vidya/universities/01.png";

import MainDemoData from "../../../data/course-details/courseData.json";
import AllCourses from "@/data/vidya/VidyaCourses.json";

import { useEffect, useState } from "react";

const HomeCourses = ({ start, end }) => {
  const [MasterCourses, setMasterCourses] = useState([]);

  const GetMasterPopularCourses = () => {
    if (!AllCourses?.all_Courses) return;

    const popularCourses = AllCourses?.all_Courses
      .flatMap((course) => course)
      .filter((data) => data?.course_status === "popular");

    setMasterCourses(popularCourses);
  };

  useEffect(() => {
    GetMasterPopularCourses();
  }, [AllCourses]);

  const BGColors = [
    "#2f57ef21",
    "#b966e721",
    "#FF000310",
    "#e9f6ff",
    "#DB7093",
  ];
  const BorderColors = [
    "#2f57ef80",
    "#b966e780",
    "#FF000380",
    "#b0d8ff",
    "#E89BB0",
  ];

  return (
    <>
      <Swiper
        className="swiper-wrapper"
        effect={"cards"}
        modules={[EffectCards, Pagination]}
        grabCursor={true}
        pagination={{
          el: ".rbt-swiper-pagination",
          clickable: true,
        }}
      >
        {/* {MainDemoData &&
          MainDemoData.courseDetails.slice(start, end).map((data, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="rbt-card variation-01 rbt-hover">
                <div className="rbt-card-img">
                  <Link href={`/course-details/${data.id}`}>
                    <Image
                      src={data.courseImg}
                      width={710}
                      height={488}
                      alt="Card image"
                    />
                    <div className="rbt-badge-3 bg-white">
                      <span>-{data.discount}%</span>
                      <span>Off</span>
                    </div>
                  </Link>
                </div>
                <div className="rbt-card-body">
                  <ul className="rbt-meta">
                    <li>
                      <i className="feather-book"></i>
                      {data.lesson} Lessons
                    </li>
                    <li>
                      <i className="feather-users"></i>
                      {data.student} Students
                    </li> 
                  </ul>
                  <h4 className="rbt-card-title">
                    <Link href={`/course-details/${data.id}`}>
                    {data.courseTitle} 
                      Masters Business Administrator
                    </Link>
                  </h4>
                  <p className="rbt-card-text">{data.desc.substring(0, 100)}</p>
                  <div className="rbt-review">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="rating-count">
                      ({data.review} Reviews)
                    </span>
                  </div>
                  <div className="rbt-card-bottom">
                    <div className="rbt-price">
                      <span className="current-price">${data.price}</span>
                      <span className="off-price">${data.offPrice}</span>
                    </div>
                    <Link
                      className="rbt-btn-link"
                      href={`/course-details/${data.id}`}
                    >
                      Learn More
                      <i className="feather-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))} */}

        {MasterCourses?.slice(start, end).map((data, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="rbt-card variation-01 home-rbt-hover">
              <div className="rbt-card-img">
                <Link
                  href={`/course/${data?.course_link}`}
                  aria-label={`View details of ${data?.course_name} course`}
                >
                  <Image
                    src={data?.courseImg}
                    width={710}
                    height={200}
                    alt={`${data?.course_name} banner image`}
                  />
                </Link>
              </div>

              <div className="rbt-card-body">
                <ul className="rbt-meta">
                  {/* Meta Info - You can re-enable this when needed */}
                </ul>

                <h3>
                  <Link
                    href={`/course/${data?.course_link}`}
                    aria-label={`Explore ${data?.shortName} course`}
                  >
                    {data?.shortName}
                  </Link>
                </h3>

                <h4 className="rbt-card-title">
                  <Link
                    href={`/course/${data?.course_link}`}
                    aria-label={`View ${data?.course_name} course details`}
                  >
                    {data?.course_name}
                  </Link>
                </h4>

                <p className="rbt-card-text" style={{ color: "black" }}>
                  {data?.aboutCourseDesc?.substring(0, 100)}...
                </p>

                <div className="rbt-review">
                  {data?.specializations?.specializationList
                    ?.filter((item) => item?.popular === "popular")
                    ?.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "6px 10px",
                          margin: "4px",
                          color: "black",
                          borderRadius: "5px",
                          border: `1px solid ${BorderColors[idx]}`,
                          background: BGColors[idx],
                        }}
                      >
                        {item?.shortName}
                      </div>
                    ))}

                  <Link
                    href={`/course/${data?.course_link}`}
                    aria-label={`Explore specializations of ${data?.course_name}`}
                    style={{
                      padding: "6px 10px",
                      margin: "4px",
                      color: "white",
                      letterSpacing: "1px",
                      borderRadius: "5px",
                      border: `1px solid ${BorderColors[4]}`,
                      background: BGColors[4],
                      cursor: "pointer",
                    }}
                  >
                    Explore {data?.shortName}
                  </Link>
                </div>

                <div className="rbt-card-bottom">
                  <div className="rbt-price">
                    {/* Pricing info placeholder */}
                  </div>

                  <Link
                    className="rbt-btn-link"
                    href={`/course/${data?.course_link}`}
                    aria-label={`Learn more about ${data?.course_name} course`}
                  >
                    Learn More about {data?.shortName}
                    <i className="feather-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="rbt-swiper-pagination"></div>
      </Swiper>
    </>
  );
};

export default HomeCourses;
