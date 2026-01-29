import React from "react";
import DynamicCourseTable from "../../Courses/DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const UniSchoolLevelProgramAdmissionProcess = ({ CourseDetails }) => {

  return (
    <>
      <div
        id="SchoolLevelProgramAdmissionProcess"
        style={{
          textAlign: "justify",
        }}
        className="pt--55"
      >
        <div className="d-flex justify-content-start gap-2 mb-4">
          <h5 className="mb-2">
            {CourseDetails?.course_type} {CourseDetails?.shortName} School Level Program Admission Process
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column  ">
            <h5 style={{ padding: "0", margin: "0 0 15px 0" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {
                  CourseDetails?.admissionProcess?.admissionProcessPoints
                    ?.heading
                }
              </ReactMarkdown>
            </h5>

            {CourseDetails?.admissionProcess?.admissionProcessPoints?.desc?.map(
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
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                      ),
                    }}
                  >
                    {items}
                  </ReactMarkdown>
                </p>
              )
            )}

            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {CourseDetails?.admissionProcess?.admissionProcessPoints?.admissionProcessKeyPoint?.map(
                (step, index) => (
                  <li
                    key={index}
                    style={{
                      color: "black",
                      fontSize: "16px",
                      marginBottom: "0",
                      paddingBottom: "0",
                    }}
                  >
                    <strong>
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
                        {step.title + " : "}
                      </ReactMarkdown>
                    </strong>
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a {...props} target="_blank" rel="noopener noreferrer" />
                        ),
                      }}
                    >
                      {step.desc}
                    </ReactMarkdown>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="d-flex justify-content-center flex-column mt-2 mb-5 ">
            <h5 style={{ padding: "0", margin: "0 0 15px 0" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {
                  CourseDetails?.admissionProcess?.admissionProcessPoints
                    ?.whoCanApplyKeyPoints?.heading
                }
              </ReactMarkdown>
            </h5>

            {CourseDetails?.admissionProcess?.admissionProcessPoints?.whoCanApplyKeyPoints?.desc?.map(
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
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                      ),
                    }}
                  >
                    {items}
                  </ReactMarkdown>
                </p>
              )
            )}

            <ul
              style={{
                fontSize: "16px",
                color: "black",
                padding: "0 0 0 20px",
                margin: "0 0 10px 0",
              }}
              className="list-disc list-inside "
            >
              {CourseDetails?.admissionProcess?.admissionProcessPoints?.whoCanApplyKeyPoints?.keyPoints?.map(
                (item, index) => (
                  <li
                    style={{
                      color: "black",
                      fontSize: "16px",
                      padding: "0",
                      margin: "0 0 10px 0",
                    }}
                    key={index}
                  >
                    <strong>
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
                        {item.title}
                      </ReactMarkdown>
                    </strong>
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a {...props} target="_blank" rel="noopener noreferrer" />
                        ),
                      }}
                    >
                      {item.desc}
                    </ReactMarkdown>
                  </li>
                )
              )}
            </ul>

            <p
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
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {
                  CourseDetails?.admissionProcess?.admissionProcessPoints
                    ?.whoCanApplyKeyPoints?.subHeading
                }
              </ReactMarkdown>
            </p>
          </div>

          <div className="d-flex justify-content-center flex-column mt-3 mb-5 ">
            <h5 style={{ padding: "0", margin: "0 0 15px 0" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {
                  CourseDetails?.admissionProcess?.admissionProcessPoints
                    ?.isOnline?.heading
                }
              </ReactMarkdown>
            </h5>

            {CourseDetails?.admissionProcess?.admissionProcessPoints?.isOnline?.desc?.map(
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
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                      ),
                    }}
                  >
                    {items}
                  </ReactMarkdown>
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UniSchoolLevelProgramAdmissionProcess;
