import React from "react";
import DynamicCourseTable from "../../Courses/DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const UniSchoolLevelProgramOverview = ({ CourseDetails }) => {
  return (
    <>
      <div
        id="SchoolLevelProgramOverview"
        style={{
          // background: "yellow",
          textAlign: "justify",
        }}
        className="pt--60"
      >
        <div className="d-flex justify-content-start gap-2">
          <h5 className="p--0 m--0">
            {" "}
            {CourseDetails?.course_type} {CourseDetails?.shortName} Overview
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black", fontSize: "16px" }}>
          {CourseDetails?.overview?.overviewDetails?.map((items, index) => (
            <div
              key={index}
              className="d-flex justify-content-center flex-column "
            >
              <h5
                style={{
                  padding: "0",
                  margin: "0 0 15px 0",
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
                  {items.question}
                </ReactMarkdown>
              </h5>
              {items?.answer?.map((ans) => (
                <p
                  style={{
                    fontSize: "16px",
                    color: "black",
                    padding: "0",
                    margin: "0 0 15px 0",
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
                    {ans}
                  </ReactMarkdown>
                </p>
              ))}
            </div>
          ))}
          <p
            style={{
              fontSize: "16px",
              color: "black",
              padding: "0",
              margin: "0 0 15px 0",
            }}
          >
            Given that, here is an overview of the entire program:-
          </p>
          <div className="d-flex justify-content-left align-items-left ">
            <DynamicCourseTable
              headers={["feature", "details"]}
              data={CourseDetails?.keyoverview}
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

export default UniSchoolLevelProgramOverview;

