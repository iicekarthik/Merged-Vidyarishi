import React from "react";
// import CategorySlider from "../Category/CategoriesSlider";
import EnquiryForm from "../../Contacts/EnquiryForm";
import { FaMicrophoneAlt, FaPodcast, FaYoutube } from "react-icons/fa";
import { FcOnlineSupport } from "react-icons/fc";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const UniSchoolLevelProgramTop = ({ CourseDetails, UniversityData, BigScreenLogic }) => {
  const BgColorCareerForScope = [
    "#2f57ef21",
    "#b966e721",
    "#FF000310",
    "#e9f6ff",
  ];

  return (
    <>
      <div
        id="SchoolLevelProgramTopPage"
        style={{
          padding: "20px",
          marginBottom: "10px",
          // border: "1px solid #dee2e6",
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: BigScreenLogic ? "row" : "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1200px", // Centering content within a max-width
            gap: "20px",
          }}
        >
          <div style={{ flex: "1", minWidth: "60%" }}>
            <h2 style={{ margin: 0, textAlign: "left", lineHeight: "1" }}>
              <span style={{ color: "purple" }}>
                {/* {CourseDetails?.shortName === "BSc"
                  ? "F-TELL"
                  : CourseDetails?.shortName === "BTech"
                  ? "F-TELL"
                  : CourseDetails?.shortName === "Mtech"
                  ? "F-TELL"
                  : CourseDetails?.shortName === "MSc"
                  ? "F-TELL"
                  : CourseDetails?.course_type}{" "} */}
                  {CourseDetails?.course_type}{" "}
                {CourseDetails?.shortName}
              </span>{" "}
              <Link
                href={`/${UniversityData?.link}`}
                style={{ cursor: "pointer" }}
              >
                <span style={{ fontSize: "36px" }}>
                  {` In ${UniversityData?.subtitle} `}
                </span>
              </Link>
            </h2>

            <div
              className="mt--20"
              style={{
                color: "black",
                fontWeight: "normal",
                textAlign: BigScreenLogic ? "left" : "justify",
              }}
            >
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
                  {CourseDetails?.aboutCourseDesc}
                </ReactMarkdown>
              </span>
            </div>

            <div className="mt--30 mb--20">
              <div
                className="mt-2"
                style={{
                  color: "black",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                {CourseDetails?.specializations?.specializationList
                  ?.slice(0, 3)
                  ?.map((item, index) => (
                    <span
                      key={index}
                      style={{
                        padding: "8px 16px",
                        background: BgColorCareerForScope[index],
                        color: "Black",
                        borderRadius: "5px",
                        fontSize: "14px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
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
                        {item?.specialization_name}
                      </ReactMarkdown>
                    </span>
                  ))}
                <span
                  style={{
                    padding: "8px 16px",
                    background: "pink",
                    color: "Black",
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  Explore More..
                </span>
              </div>
            </div>

            <div
              className="mt--30"
              style={{
                color: "black",
                display: BigScreenLogic ? "flex" : "block",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                width: BigScreenLogic ? "92%" : "100%",
              }}
            >
              {[
                {
                  Icon: <FcOnlineSupport size={24} />,
                  Title: "Get 100% Free Counselling",
                  bgColor: "#e9f6ff",
                  Color: "black",
                },
                {
                  Icon: <FaYoutube size={22} />,
                  Title: "Watch Video",
                  bgColor: "#b966e721",
                  Color: "red",
                },
                {
                  Icon: (
                    <FaMicrophoneAlt style={{ color: "purple" }} size={22} />
                  ),
                  Title: "Listen Podcast",
                  bgColor: "#fffccf",
                  Color: "black",
                },
              ]?.map((item, index) => (
                <div
                  key={index}
                  style={{
                    marginTop: BigScreenLogic ? "" : "15px",
                    cursor: "pointer",
                    flexGrow: 1,
                    textAlign: "center",
                    padding: "12px 16px",
                    background: item?.bgColor ? item?.bgColor : "#2f57ef",
                    color: item?.Color ? item?.Color : "white",
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "800",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.3s ease-in-out", // Smooth transition effect
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)"; // Slightly increase size
                    e.currentTarget.style.boxShadow =
                      "0px 4px 10px rgba(0, 0, 0, 0.1)"; // Add shadow
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)"; // Reset size
                    e.currentTarget.style.boxShadow = "none"; // Remove shadow
                  }}
                >
                  {item?.Icon}
                  <span>{item?.Title}</span>
                </div>
              ))}
            </div>

            <div className="mt--30">
              {/* <CategorySlider isCoursePage={true} /> */}
            </div>
          </div>

          <div style={{}}>
            <EnquiryForm
              buttonName="Enquire Now"
              InputFontSize="14px"
              Inputheight="36px"
              SelectPadding="0px 10px"
              isEnquiryButton={false}
              isEnquiryContactButton={true}
              isFormInputMarginTop="10"
              isSelectedCourse={CourseDetails}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UniSchoolLevelProgramTop;
