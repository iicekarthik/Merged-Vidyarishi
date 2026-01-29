import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

const VidyaHorizontalBlogSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const staticSlides = [
    {
      title: "30 Essential Finance Interview Questions and Answers",
      description:
        "The finance industry is massive, worth over $20 trillion globally, and it’s growing fast. It’s also one of the most competitive fields, attracting talented people from all over the world...",
      date: "07 Feb 2025",
      timeToRead: "12 min read",
      category: "Management",
      image: "/images/interview-thumbnail.jpg",
      author: {
        name: "Kamal Jacob",
        avatar: "/images/vidya/homeSlide1/online_mba.png",
      },
    },
    {
      title: "30 Essential Finance Interview Questions and Answers",
      description:
        "The finance industry is massive, worth over $20 trillion globally, and it’s growing fast. It’s also one of the most competitive fields, attracting talented people from all over the world...",
      date: "07 Feb 2025",
      timeToRead: "12 min read",
      category: "Management",
      image: "/images/interview-thumbnail.jpg",
      author: {
        name: "Kamal Jacob",
        avatar: "/images/vidya/homeSlide1/online_mba.png",
      },
    },
    // Add more slides here...
  ];

  return (
    <div
      style={{
        width: "100%",
        padding: "0 0px",
        margin: "0 auto",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Navigation Buttons */}
        {staticSlides.length > 1 && (
          <>
            <div
              className="rbt-arrow-left"
              style={{
                position: "absolute",
                top: "50%",
                left: "-30px", // Adjust based on padding
                transform: "translateY(-50%)",
                zIndex: 10,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 0px 60px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FaChevronLeft size={14} />
            </div>

            <div
              className="rbt-arrow-right"
              style={{
                position: "absolute",
                top: "50%",
                right: "-30px", // Adjust based on padding
                transform: "translateY(-50%)",
                zIndex: 10,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <FaChevronRight size={14} />
            </div>
          </>
        )}

        {/* Swiper */}
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".rbt-arrow-right",
            prevEl: ".rbt-arrow-left",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {staticSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  padding: "20px",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    boxShadow: "0 0px 15px 10px  rgba(119, 0, 255, 0.1)",
                    borderRadius: "16px",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px",
                    maxWidth: "1000px",
                    minHeight: "auto",
                    margin: "0 auto",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    transition: "transform 0.3s ease",
                    position: "relative",
                  }}
                >
                  {/* Image */}
                  <div style={{ overflow: "hidden" }}>
                    <Image
                      src={"/images/vidya/homeSlide1/online_mba.png"}
                      alt={slide.title || "Image Not Available"}
                      width={260}
                      height={160}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                  </div>

                  {/* Content */}
                  {/* Content */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "normal",
                      alignItems: "flex-start",
                      paddingRight: "20px",
                      marginRight: "15px",
                      position: "relative",
                      height: "240px", // Set a fixed height or minHeight to ensure the container has space
                      // background : "red"
                    }}
                  >
                    {/* <div
                  style={{
                    fontSize: "14px",
                    color: "#999",
                    marginBottom: "8px",
                  }}
                >
                {slide.date} | {slide.timeToRead}
                </div> */}

                    <p
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        marginBottom: "8px",
                        fontWeight: "500",
                      }}
                    >
                      {slide.date} | {slide.timeToRead}
                    </p>

                    <h3
                      style={{
                        fontSize: "20px",
                        color: "#111",
                        fontWeight: "600",
                        marginBottom: "8px",
                      }}
                    >
                      {slide.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#800080",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      {slide.category}
                    </p>

                    <p
                      style={{
                        fontSize: "15px",
                        color: "#555",
                        lineHeight: "1.5",
                        marginBottom: "16px",
                        overflow: "hidden",
                      }}
                    >
                      {slide.description}
                    </p>

                    {/* Footer Zone */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0px",
                        left: "0",
                        right: "0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingRight: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Image
                          src={slide.author.avatar}
                          alt={slide.author.name || "Image Not Available"}
                          width={25}
                          height={25}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#333",
                          }}
                        >
                          {slide.author.name}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#008000",
                        }}
                      >
                        <MdOutlineVerified
                          size={22}
                          style={{ color: "#008000" }}
                        />{" "}
                        Verified Expert
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Dots */}
        <div
          className="custom-pagination"
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            top: "94%",
            zIndex: 5,
          }}
        />
      </div>
    </div>
  );
};

export default VidyaHorizontalBlogSlider;
