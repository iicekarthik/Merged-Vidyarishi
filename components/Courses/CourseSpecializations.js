import React from "react";
import DynamicCourseTable from "./DynamicCourseTable";
import CourseSpecializationTable from "./CourseSpecializationTable";
import ReactMarkdown from "react-markdown";

const CourseSpecializations = ({
  CourseDetails,
  BigScreenLogic,
  slugcourses,
  MainSpecializations,
}) => {
  const BgColors = [
    "#800080",
    "#800080",
    "#800080",
    "#800080",
    "#800080",
    "#800080",
    "#800080",
    "#800080",
    "#800080",
    "#800080",
  ];

  return (
    <>
      <div
        id="CourseSpecializations"
        style={{
          // background: "yellow",
          textAlign: "justify",
        }}
        className="pt--60"
      >
        <div className="d-flex justify-content-start gap-2 mb-4">
          <h5 className="mb-2">
            {CourseDetails?.course_type} {CourseDetails?.shortName} Course
            Specializations
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column mb-5">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {CourseDetails?.specializations?.specialOne?.heading}
              </ReactMarkdown>
            </h5>
            {CourseDetails?.specializations?.specialOne?.desc?.map(
              (items, index) => (
                <div
                  key={index}
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
                    {items}
                  </ReactMarkdown>
                </div>
              )
            )}
          </div>

          <div className="d-flex justify-content-center flex-column">
            <div
              className="d-flex flex-wrap justify-content-center"
              style={{
                maxWidth: "100%",
                rowGap: "0px",
                columngap: "10px",
                gap: "10px",
              }}
            >
              <CourseSpecializationTable
                BigScreenLogic={BigScreenLogic}
                headers={["Specialization Courses", "Specialization Courses"]}
                data={MainSpecializations}
                headerBgColor="#374151"
                headerTextColor="white"
                hoverColor="#D1D5DB"
                borderColor="#9CA3AF"
                borderRadius="8px" // 🔹 Custom border-radius
                boxShadow="0px 5px 10px rgba(0, 0, 0, 0.2)"
                splitColumns={true}
                slugcourses={slugcourses}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center flex-column mt-5 mb-3">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {CourseDetails?.specializations?.specialTwo?.heading}
              </ReactMarkdown>
            </h5>
            {CourseDetails?.specializations?.specialTwo?.desc?.map(
              (items, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    padding: "0",
                    margin: "0 0 15px 0",
                  }}
                >
                  {items}
                </p>
              )
            )}
          </div>

          <div className="d-flex justify-content-center flex-column my-4">
            <DynamicCourseTable
              BigScreenLogic={BigScreenLogic}
              headers={[
                "specialization",
                "feeRange",
                "keySubjects",
                "topHiringFirms",
              ]}
              data={CourseDetails?.specializations?.specialTwo?.specialListTwo}
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

export default CourseSpecializations;
