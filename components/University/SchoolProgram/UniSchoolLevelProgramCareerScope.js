import React from "react";
import DynamicCourseTable from "../../Courses/DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const UniSchoolLevelProgramCareerScope = ({ CourseDetails }) => {
  return (
    <>
      <div
        id="SchoolLevelProgramCareerScope"
        style={{
          textAlign: "justify",
        }}
        className="pt--55"
      >
        <div className="d-flex justify-content-start gap-2">
          <h5 className="m-0">
            {CourseDetails?.course_type} {CourseDetails?.shortName} Career Scope
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column mb-5 ">
            <h5 className="">
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {CourseDetails?.career_scope?.subCareerScope?.heading}
              </ReactMarkdown>
            </h5>

            {CourseDetails?.career_scope?.subCareerScope?.desc?.map(
              (items, index) => (
                <p
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
                </p>
              )
            )}
          </div>

          {/* Table - 1 */}
          <div className="d-flex justify-content-center flex-column">
            <DynamicCourseTable
              headers={["careerLevel", "jobRole", "salaryRange"]}
              data={CourseDetails?.career_scope?.subCareerScope?.careerPoints}
              headerBgColor="#374151"
              headerTextColor="white"
              hoverColor="#D1D5DB"
              borderColor="#9CA3AF"
              borderRadius="8px"
              boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)"
            />
          </div>

          {/* Table - 2 */}
          <div className="d-flex justify-content-center flex-column mb-5 mt--40 ">
            <h5>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {
                  CourseDetails?.career_scope?.subCareerScope?.careerPointsTwo
                    ?.heading
                }
              </ReactMarkdown>
            </h5>

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
              borderRadius="8px"
              boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UniSchoolLevelProgramCareerScope;
