import React from "react";
import CategorySlider from "../Category/CategoriesSlider";
import EnquiryForm from "../Contacts/EnquiryForm";
import { FaMicrophoneAlt, FaPodcast, FaYoutube } from "react-icons/fa";
import { FcOnlineSupport } from "react-icons/fc";
import { useScreenSize } from "@/hooks/screenSize";
import ReactMarkdown from "react-markdown";

const CourseTop = ({ CourseDetails, slugcourses, MainSpecializations }) => {
  const BgColorCareerForScope = [
    "#2f57ef21",
    "#b966e721",
    "#FF000310",
    "#e9f6ff",
  ];

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    <>
      <div
        id="CourseTopPage"
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
            display: BigScreenLogic ? "flex" : "flex",
            display: "flex",
            flexDirection: BigScreenLogic ? "row" : "column",
            // flexWrap: "wrap",
            width: "100%",
            margin: "0 auto", // Centering content
            gap: BigScreenLogic ? "20px" : "2px",
          }}
        >
          <div
            style={{
              flex: BigScreenLogic ? "0.7" : "1",
              minWidth: BigScreenLogic ? "60%" : "100%",
            }}
          >
            <h2
              style={
                {
                  // margin: 0,
                  // lineHeight: "1",
                  // textAlign: BigScreenLogic ? "left" : "justify",
                }
              }
            >
              <span style={{ color: "purple" }}>
                {CourseDetails?.course_type} {CourseDetails?.shortName}
              </span>{" "}
              <span style={{ fontSize: "36px" }}>
                Degree Course from University/Colleges
              </span>
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
                      <a {...props} target="_blank" rel="noopener noreferrer" />
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
                {MainSpecializations?.slice(0, BigScreenLogic ? 4 : 3)?.map(
                  (item, index) => (
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
                        {item?.specialization_name || item?.title}
                      </ReactMarkdown>
                    </span>
                  )
                )}
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
                  More..
                </span>
              </div>
            </div>

            <div
              className={`"mt--30"`}
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
                    background: item?.bgColor ? item.bgColor : "#2f57ef",
                    color: item?.Color ? item.Color : "white",
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

            <div className={`${BigScreenLogic ? "mt--40" : "mt-5 mb-4"}`}>
              <CategorySlider
                BigScreenLogic={BigScreenLogic}
                isCoursePage={true}
              />
            </div>
          </div>

          <div
            style={{
              flex: BigScreenLogic ? "0.3" : "1",
              minWidth: BigScreenLogic ? "30%" : "100%",
            }}
          >
            <EnquiryForm
              buttonName="Enquire Now"
              InputFontSize="14px"
              Inputheight="36px"
              SelectPadding="0px 10px"
              isEnquiryButton={false}
              isEnquiryContactButton={true}
              isEnquiryContactGet={false}
              isFormInputMarginTop="10"
              isSelectedCourse={CourseDetails}
              BigScreenLogic={BigScreenLogic}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseTop;
