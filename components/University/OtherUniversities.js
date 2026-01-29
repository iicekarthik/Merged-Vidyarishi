"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import AllUniversities from "../../data/vidya/University.json";
import Link from "next/link";
import { useScreenSize } from "@/hooks/screenSize";

// Import Swiper Components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ReactMarkdown from "react-markdown";


const OtherUniversities = ({ university }) => {
  const [PresentYear, setPresentYear] = useState(null);

  useEffect(() => {
    setPresentYear(new Date().getFullYear());
  }, []);

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    <div
      id="UniversityOtherUniversities"
      style={{ padding: "60px 20px 0 20px" }}
    >
      <div>
        <h5 style={{ marginBottom: "10px" }}>Other Universities</h5>
      </div>

      <div style={{ marginBottom: "20px", color: "black", fontSize: "18px" }}>
        Check Out Top Online Universities for Admission {PresentYear}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          gap: "20px",
        }}
      >
        <Swiper
          style={{
            padding: "10px 10px",
          }}
          slidesPerView={1}
          modules={[Autoplay]}
          navigation={false}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            481: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 6 },
          }}
        >
          {AllUniversities?.AllUniversities?.filter(
            (uni) => uni?.id !== university?.id
          ).length > 0 ? (
            AllUniversities.AllUniversities.filter(
              (uni) => uni?.id !== university?.id
            ).map((data, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={data?.link}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div
                    style={{
                      padding: "20px",
                      borderRadius: "10px",
                      background: "white",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                      transition: "transform 0.3s",
                      cursor: "pointer",
                      margin: "10px",
                    }}
                  >
                    <Image
                      width={160}
                      height={60}
                      src={data?.image || "/default-image.png"}
                      alt={data?.title || "University"}
                      style={{
                        borderRadius: "5px",
                        objectFit: "contain",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                    <h2
                      style={{
                        fontSize: "1.3rem",
                        marginTop: "10px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        padding: "10px 0 0 0",
                        fontWeight: "bolder",
                        margin: "0",
                      }}
                    >
                      <ReactMarkdown
                        components={{
                          a: ({ node, ...props }) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "blue",
                                textDecoration: "underline",
                              }}
                            />
                          ),
                        }}
                      >
                        {data?.title}
                      </ReactMarkdown>
                    </h2>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              No other universities available.
            </p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default OtherUniversities;
