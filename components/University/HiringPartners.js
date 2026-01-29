import { useScreenSize } from "@/hooks/screenSize";
import Image from "next/image";
import React from "react";
import { FaStarOfLife } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css"; // 🛠 Swiper CSS Import Zaroori Hai
import ReactMarkdown from "react-markdown";

const HiringPartners = ({ university }) => {
  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    <div id="UniversityHiringPartners" className="px-5 pt--60">
      <div className="d-flex justify-content-start gap-2">
        <h5 className="mb-2">Hiring Partners Of {university?.title}</h5>
      </div>

      <div
        style={{
          fontSize: "16px",
          color: "black",
        }}
        className="ml--0"
      >
        Our students get an opportunity to work with
      </div>

      <ul
        style={{
          paddingLeft: "20px",
          marginTop: "10px",
          marginBottom: "20px",
          listStyle: "none",
          padding: "0",
          margin: "0",
        }}
      >
        {university?.hiringPartners?.headPoints?.map((data, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "start",
              gap: "10px",
              marginBottom: "8px",
              fontSize: "16px",
              color: "black",
            }}
          >
            <span style={{ marginTop: "-2px" }}>
              <FaStarOfLife size={10} />
            </span>
            <span>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      
                    />
                  ),
                }}
              >
                {data}
              </ReactMarkdown>
            </span>
          </li>
        ))}
      </ul>

      {/* ✅ Swiper Fix */}
      <Swiper
        style={{
          padding: "30px 0 10px 10px",
        }}
        slidesPerView={1}
        modules={[Autoplay]}
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
        {university?.hiringPartners?.companiesDetails?.map((data, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                flex: "0 0 auto",
                width: BigScreenLogic ? "140px" : "",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                padding: "12px",
                cursor: "pointer",
                transition: "transform 0.3s ease-in-out",
                textAlign: "center",
                margin: BigScreenLogic ? "0 0 0 0" : "0 20px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Image
                width={BigScreenLogic ? 60 : 180}
                height={BigScreenLogic ? 60 : 80}
                src={data?.image}
                alt={data?.title || "Image Not Available"}
                style={{ borderRadius: "6px" }}
              />
              <h2
                style={{
                  fontSize: "1.3rem",
                  margin: "10px 0 0 0",
                  textAlign: "center",
                }}
              >
                {data?.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HiringPartners;

{
  /* {BigScreenLogic ? (
            <button
              onClick={() => {
                document
                  .getElementById("scroll-container")
                  ?.scrollBy({ left: -150, behavior: "smooth" });
              }}
              style={{
                position: "absolute",
                left: "4px",
                zIndex: 10,
                background: "#800080",
                color: "#fff",
                border: "none",
                padding: "10px 12px",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            >
              <i className="feather-arrow-left"></i>
            </button>
          ) : (
            ""
          )} */
}
