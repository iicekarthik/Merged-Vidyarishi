import Link from "next/link";
import React, { useState } from "react";
import PopupForm from "../PopupForm/PopupForm";
import { useAppContext } from "@/context/Context";
import { FaExternalLinkAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const CoursesUniversity = ({ university, screenSize, slug }) => {
  const BigScreenLogic = ["xxl", "xl"].includes(screenSize);
  const order = ["MBA", "MCA", "MSC", "MCOM", "MA", "WP.MBA"];

  const { isOpen, setIsOpen } = useAppContext();
  return (
    <>
      <div
        id="UniversityCourse"
        // style={{ padding: "60px 60px 0px 60px" }}
        className="px-5 pt--60"
      >
        {/* <div>
        <h5>
          All Courses{" "}
          <span style={{ color: "purple" }}> {university?.title}</span>
        </h5>
      </div> */}

        <div className="d-flex justify-content-start gap-2 mb-4">
          <h5
            className="mb-2 "
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            All Courses Of {university?.title}
          </h5>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "start",
              gap: "10px",
              // padding: "20px",
              width: BigScreenLogic ? "100%" : "100%",
            }}
          // className="d-flex flex-column flex-xxl-row flex-xl-row"
          >
            <div className="d-flex justify-content-center flex-column ">
              {university?.courseContent?.map((ContentData, index) => (
                <div
                  style={{
                    fontSize: "16px",
                    color: "black",
                    textAlign: "justify",
                    margin: "10px 0 0 0",
                  }}
                // dangerouslySetInnerHTML={{ __html: }}
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
                    {ContentData.content}
                  </ReactMarkdown>
                </div>
              ))}
            </div>

            <div
              style={{
                width: "100%",
                overflow: "hidden",
                overflowX: BigScreenLogic ? "hidden" : "scroll",
              }}
            >
              {(() => {
                // Master's aur Bachelor's dono ke liye sorting order define karna
                const mastersOrder = ["MBA", "MCA", "M.Sc", "MSc", "M.Com", "MA", "WP.MBA"];
                const bachelorsOrder = ["BBA", "BCA", "B.Sc", "B.Com", "BA"];

                const degreeTypes = [
                  ...new Set(
                    university?.courses?.map((course) => course?.degree_name)
                  ),
                ].sort((a, b) =>
                  a === "Master's Degree" ? -1 : b === "Master's Degree" ? 1 : 0
                );

                return degreeTypes?.map((degreeType) => {
                  // Bachelor's ya Master's ke liye sahi sorting order choose karna
                  const order = degreeType?.includes("Bachelor")
                    ? bachelorsOrder
                    : mastersOrder;

                  const filteredCourses = university?.courses
                    ?.filter((course) => course?.degree_name === degreeType)
                    ?.sort(
                      (a, b) =>
                        (order.indexOf(a?.shortName) === -1
                          ? order.length
                          : order.indexOf(a?.shortName)) -
                        (order.indexOf(b?.shortName) === -1
                          ? order.length
                          : order.indexOf(b?.shortName))
                    );

                  if (!filteredCourses?.length) return null;

                  return (
                    <table
                      border="2"
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "left",
                        marginBottom: "20px",
                      }}
                      key={degreeType}
                    >
                      <thead>
                        <tr>
                          <th
                            colSpan={5}
                            style={{
                              fontSize: "16px",
                              color: "black",
                              padding: "10px",
                              border: "2px solid black",
                              textAlign: "center",
                              backgroundColor: "#f2f2f2",
                            }}
                          >
                            {degreeType}
                          </th>
                        </tr>
                        <tr>
                          {[
                            { IconName: "book", HeaderName: "Course" },
                            { IconName: "clock", HeaderName: "Duration" },
                            {
                              IconName: "rupee",
                              HeaderName: degreeType === "Diploma Certificate" ? "Annual Fee" : degreeType === "PG Diploma Certifiate" ? "Annual Fee" : university?.isAnnualFee
                                ? "Annual Fee"
                                : "Semester Fee",
                            },
                            {
                              IconName: "more-vertical",
                              HeaderName: "EMI Available",
                            },
                            {
                              IconName: "download",
                              HeaderName: "Download Brochure",
                            },
                          ].map((TableHead, idx) => (
                            <th
                              key={idx}
                              style={{
                                fontSize: "16px",
                                padding: "10px",
                                color: "black",
                                backgroundColor: "#ebebeb",
                                border: "2px solid black",
                                textAlign: "center",
                                minWidth:
                                  TableHead.HeaderName === "Course"
                                    ? "250px"
                                    : "auto",
                                width:
                                  TableHead.HeaderName === "Course"
                                    ? "250px"
                                    : "auto",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {TableHead?.IconName === "rupee" ? (
                                <i className="mr--10">₹</i>
                              ) : (
                                <i
                                  className={`feather-${TableHead.IconName} mr--10`}
                                ></i>
                              )}
                              {TableHead.HeaderName}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCourses.map((data, index) => (
                          <tr key={index}>
                            {[
                              data?.shortName,
                              data?.duration,
                              university?.isAnnualFee
                                ? data?.annualFeeRange
                                : data?.semesterFeeRange,
                              data?.emiAvailable,
                              "Download Brochure",
                            ].map((item, colIndex) => (
                              <td
                                key={colIndex}
                                style={{
                                  fontSize: "14px",
                                  color: "black",
                                  padding: "10px",
                                  border: "2px solid black",
                                  textAlign: "center",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {colIndex === 0 ? (
                                  data?.course_link ? (
                                    <Link
                                      href={`${slug}/${data?.course_link}`}
                                      legacyBehavior
                                    >
                                      <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          color: "blue",
                                          fontWeight: "bold",
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "5px",
                                          justifyContent: "center",
                                        }}
                                      >
                                        {item} <FaExternalLinkAlt />
                                      </a>
                                    </Link>
                                  ) : (
                                    <button
                                      style={{
                                        color: "blue",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        justifyContent: "center",
                                        background: "none",
                                        border: "none",
                                      }}
                                    >
                                      {item}
                                    </button>
                                  )
                                ) : colIndex === 4 ? (
                                  <button
                                    style={{
                                      backgroundColor: "#007bff",
                                      color: "white",
                                      padding: "8px 12px",
                                      border: "none",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                      fontSize: "14px",
                                    }}
                                    onClick={() => {
                                      setIsOpen(true);
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
                                      {item}
                                    </ReactMarkdown>
                                  </button>
                                ) : (
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
                                    {item}
                                  </ReactMarkdown>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesUniversity;
