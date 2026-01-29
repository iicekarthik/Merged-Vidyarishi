import React from "react";
import DynamicCourseTable from "../../Courses/DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const UniSpecializationEligibilityDuration = ({
  CourseDetails,
  specializationDetails,
}) => {
  return (
    <>
      <div
        id="CourseEligibilityDuration"
        style={{
          // background: "yellow",
          textAlign: "justify",
        }}
        className="pt--60"
      >
        <div className="d-flex justify-content-start gap-2">
          <h5
            style={{
              padding: "0",
              margin: "0 0 15px 0",
            }}
          >
            {CourseDetails?.course_type}
            {CourseDetails?.shortName} in{" "}
            {specializationDetails.specialization_name} Eligibility Criteria And
            Duration
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column">
            <p
              style={{
                fontSize: "16px",
                color: "black",
              }}
            >
              {specializationDetails?.eligibilityDuration?.desc}
            </p>
          </div>

          <div className="d-flex justify-content-center flex-column mt-4">
            <h5
              style={{
                fontSize: "18px",
                color: "black",
                padding: "0",
                margin: "10px 0 6px 0",
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

                {
                  specializationDetails?.eligibilityDuration?.eligibilityDetails
                    ?.heading
                }
              </ReactMarkdown>
            </h5>
            <div className="pl--20">
              <ul style={{ padding: "0", margin: "0 0 15px 0" }}>
                {specializationDetails?.eligibilityDuration?.eligibilityDetails?.points?.map(
                  (items, index) => (
                    <li
                      style={{
                        fontSize: "16px",
                        color: "black",
                      }}
                    >
                      <b>{items?.title} :- </b>
                      {items?.desc}
                    </li>
                  )
                )}
              </ul>
              <p
                style={{
                  fontSize: "18px",
                  color: "black",
                  padding: "0",
                  margin: "0px 40px 15px 0",
                }}
              >
                <b>
                  {
                    specializationDetails?.eligibilityDuration
                      ?.eligibilityDetails?.note?.title
                  }
                  :-
                </b>{" "}
                {
                  specializationDetails?.eligibilityDuration?.eligibilityDetails
                    ?.note?.desc
                }
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-center flex-column ">
            <h5
              style={{
                fontSize: "18px",
                color: "black",
                padding: "0",
                margin: "18px 0 10px 0",
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

                {
                  specializationDetails?.eligibilityDuration?.durationDetails
                    ?.heading
                }
              </ReactMarkdown>
            </h5>
            <div className="pl--20">
              <ul style={{ padding: "0", margin: "0 0 15px 0" }}>
                {specializationDetails?.eligibilityDuration?.durationDetails?.points?.map(
                  (items, index) => (
                    <li
                      style={{
                        fontSize: "16px",
                        color: "black",
                      }}
                    >
                      <b>{items?.title} :- </b>
                      {items?.desc}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="d-flex justify-content-center flex-column my-4">
            <h5
              style={{
                fontSize: "18px",
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

                {specializationDetails?.eligibilityDuration?.advantages?.heading}
              </ReactMarkdown>
            </h5>
            <p
              style={{
                fontSize: "16px",
                color: "black",
                padding: "0",
                margin: "0 0 0px 0",
              }}
            >
              {specializationDetails?.eligibilityDuration?.advantages?.desc}
            </p>
          </div>

          <div className="d-flex justify-content-center flex-column mb--40 mt-5">
            <DynamicCourseTable
              headers={["feature", "details"]}
              data={
                specializationDetails?.eligibilityDuration?.advantages
                  ?.advantagesDetail
              }
              headerBgColor="#374151"
              headerTextColor="white"
              hoverColor="#D1D5DB"
              borderColor="#9CA3AF"
              borderRadius="8px" // 🔹 Custom border-radius
              boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)" // 🔹 Custom shadow
            />
          </div>

          <div className="d-flex justify-content-center flex-column mt-4">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
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
                  specializationDetails?.eligibilityDuration?.advantages
                    ?.whyCourse?.heading
                }
              </ReactMarkdown>
            </h5>
            <p
              style={{
                fontSize: "16px",
                color: "black",
                padding: "0",
                margin: "0 0 10px 0",
              }}
            >
              {
                specializationDetails?.eligibilityDuration?.advantages
                  ?.whyCourse?.desc
              }
            </p>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "20px",
                color: "black",
              }}
            >
              {specializationDetails?.eligibilityDuration?.advantages?.whyCourse?.whyCourseDetails?.map(
                (item, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      color: "black",
                      fontSize: "16px",
                      padding: "0",
                      margin: "0 0 15px 0",
                    }}
                  >
                    <strong>{item.title}:</strong> {item.desc}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniSpecializationEligibilityDuration;
