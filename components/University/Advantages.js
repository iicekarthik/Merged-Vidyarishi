import React, { useEffect, useState } from "react";
import { ImBooks } from "react-icons/im";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBookOpenReader } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaLaptop } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const Advantages = ({ university, screenSize }) => {
  // Define a set of unique colors
  const colors = [
    "#FF8F3C10",
    "#e9f6ff",
    "#2f57ef21",
    "#fffccf",
    "#E9967A21",
    "#ffedff",
  ];
  const Icons = [
    <ImBooks size={26} />,
    <SiGoogleclassroom size={26} />,
    <FaBookOpenReader size={26} />,
    <BiSupport size={26} />,
    <FaLaptop size={26} />,
    <HiMiniUserGroup size={26} />,
  ];

  // State to store the assigned colors
  const [bgColors, setBgColors] = useState([]);
  const [TitleIcons, setTitleIcons] = useState([]);

  useEffect(() => {
    if (university?.advantages?.keyPoints?.length) {
      setBgColors(
        university.advantages.keyPoints.map(
          (_, index) => colors[index % colors.length]
        )
      );
      setTitleIcons(
        university.advantages.keyPoints.map(
          (_, index) => Icons[index % Icons.length]
        )
      );
    }
  }, [university]);

  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    <div
      id="UniversityAdvantages"
      // style={{ padding: "60px 0px 0px 60px" }}
      // className="px-5 pt--60"
      className="px-5 pt--60"
    >
      {/* <div>
        <h5>
          Advantages Of{" "}
          <span style={{ color: "purple" }}> {university?.title}</span>{" "}
        </h5>
      </div> */}
      <div className="d-flex justify-content-start gap-2">
        <h5 className="mb-2"> Advantages Of {university?.title}</h5>
      </div>

      <div
        style={{
          fontSize: "16px",
          color: "black",
          marginTop: "10px",
          marginBottom: "40px",
          textAlign: "justify",
        }}
      >
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
          {university?.advantages?.desc}
        </ReactMarkdown>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          marginTop: "20px",
          justifyContent: "start",
        }}
      >
        {university?.advantages?.keyPoints?.map((data, index) => (
          <div
            key={index}
            style={{
              width: BigScreenLogic ? "48%" : "100%", // Fits 2 in a row
              // minWidth: "300px", // Ensures responsiveness
              height: BigScreenLogic ? "220px" : "auto", // Fixed height for all boxes
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              padding: "20px 30px",
              textAlign: "justify",
              backgroundColor: bgColors[index], // Assign unique background color
              color: "black",
              boxShadow: "0px 1px 8px 1px gray",
              transition: "transform 0.3s ease-in-out",
              cursor: "pointer",
              borderRadius: "10px",
              fontSize: "16px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "5px",
                fontSize: "16px",
                textAlign: "left",
                display: "flex"
              }}
              className="mt--10 mb--10 "
            >
              <span className="mr--10">{TitleIcons[index]} </span>
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
                {data?.title}
              </ReactMarkdown>
            </div>
            <div style={{ fontSize: "16px" }}>
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
                {data?.desc}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
