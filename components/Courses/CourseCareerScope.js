import React from "react";
import DynamicCourseTable from "./DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const CourseCareerScope = ({ CourseDetails }) => {
  return (
    <>
      <div
        id="CourseCareerScope"
        style={{
          // background: "yellow",
          textAlign: "justify",
        }}
        className="pt--60"
      >
        <div className="d-flex justify-content-start gap-2 mb-4">
          <h5 className="mb-2">
            {CourseDetails?.course_type} {CourseDetails?.shortName} Course
            Career Scope
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column mb-5 ">
            <h5>
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
                {CourseDetails?.career_scope?.subCareerScope?.heading}
              </ReactMarkdown>
            </h5>
            {CourseDetails?.career_scope?.subCareerScope?.desc?.map(
              (items, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    padding: "0",
                    margin: "0 0 10px 0",
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
                    {items}
                  </ReactMarkdown>
                </div>
              )
            )}
          </div>

          <div className="d-flex justify-content-center flex-column  ">
            {/* <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #D1D5DB",
              }}
            >
              <thead
                style={{
                  fontSize: "16px",
                  color: "black",
                  backgroundColor: "#E5E7EB",
                  padding: "0",
                  margin: "0 0 10px 0",
                }}
              >
                <tr>
                  <th
                    style={{
                      border: "1px solid #D1D5DB",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Career Level
                  </th>
                  <th
                    style={{
                      border: "1px solid #D1D5DB",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Job Roles
                  </th>
                  <th
                    style={{
                      border: "1px solid #D1D5DB",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Salary Range
                  </th>
                </tr>
              </thead>
              <tbody
                style={{
                  fontSize: "16px",
                  color: "black",
                  padding: "0",
                  margin: "0 0 10px 0",
                }}
              >
                {careerData.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#F9FAFB" : "#FFFFFF",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#F3F4F6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? "#F9FAFB" : "#FFFFFF")
                    }
                  >
                    <td style={{ border: "1px solid #D1D5DB", padding: "8px" }}>
                      {item.level}
                    </td>
                    <td style={{ border: "1px solid #D1D5DB", padding: "8px" }}>
                      {item.roles}
                    </td>
                    <td style={{ border: "1px solid #D1D5DB", padding: "8px" }}>
                      {item.salary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <DynamicCourseTable
              headers={["careerLevel", "jobRole", "salaryRange"]}
              data={CourseDetails?.career_scope?.subCareerScope?.careerPoints}
              headerBgColor="#374151"
              headerTextColor="white"
              hoverColor="#D1D5DB"
              borderColor="#9CA3AF"
              borderRadius="8px" // 🔹 Custom border-radius
              boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)" // 🔹 Custom shadow
            />
          </div>

          <div className="d-flex justify-content-center flex-column my-5 ">
            <h5>
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
                {
                  CourseDetails?.career_scope?.subCareerScope?.careerPointsTwo
                    ?.heading
                }
              </ReactMarkdown>
            </h5>
            {/* <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #D1D5DB",
                fontSize: "16px",
                color: "black",
              }}
            >
              <thead
                style={{
                  backgroundColor: "#E5E7EB",
                  fontSize: "16px",
                  color: "black",
                  padding: "0",
                  margin: "0 0 10px 0",
                }}
              >
                <tr>
                  <th
                    style={{
                      border: "1px solid #D1D5DB",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Industry
                  </th>
                  <th
                    style={{
                      border: "1px solid #D1D5DB",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Recruiters
                  </th>
                  <th
                    style={{
                      border: "1px solid #D1D5DB",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Salary Range
                  </th>
                </tr>
              </thead>
              <tbody
                style={{
                  fontSize: "16px",
                  color: "black",
                  padding: "0",
                  margin: "0 0 10px 0",
                }}
              >
                {industryData.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#F9FAFB" : "#FFFFFF",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#F3F4F6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? "#F9FAFB" : "#FFFFFF")
                    }
                  >
                    <td style={{ border: "1px solid #D1D5DB", padding: "8px" }}>
                      {item.industry}
                    </td>
                    <td style={{ border: "1px solid #D1D5DB", padding: "8px" }}>
                      {item.recruiters}
                    </td>
                    <td style={{ border: "1px solid #D1D5DB", padding: "8px" }}>
                      {item.salary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <DynamicCourseTable
              headers={["industry", "recruiters", "salaryRange"]}
              data={
                CourseDetails?.career_scope?.subCareerScope?.careerPointsTwo
                  ?.keyPoints
              }
              headerBgColor="#374151"
              headerTextColor="white"
              hoverColor="#D1D5DB"
              borderColor="#9CA3AF"
              borderRadius="8px" // 🔹 Custom border-radius
              boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)" // 🔹 Custom shadow
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCareerScope;
