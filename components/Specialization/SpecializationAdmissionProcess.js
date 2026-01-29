import React from "react";
import DynamicCourseTable from "./DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const SpecializationAdmissionProcess = ({
  CourseDetails,
  BigScreenLogic,
  specialization,
}) => {
  return (
    <>
      <div
        id="CourseAdmissionProcess"
        style={{
          textAlign: "justify",
          padding: "20px",
        }}
        className="pt--60"
      >
        {/* Course Admission Heading */}
        <div className="d-flex justify-content-start gap-2 mb-4">
          <h5 className="mb-2">
            {CourseDetails?.course_type} {CourseDetails?.shortName} in{" "}
            {specialization.specialization_name} Course Admission Process
          </h5>
        </div>

        {/* Admission Process Points */}
        <div style={{ color: "black" }}>
          <div className="d-flex justify-content-start flex-column gap-2 mb-4">
            <h5 className="mb-2">
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
                  specialization?.admissionProcess?.admissionProcessPoints
                    ?.heading
                }
              </ReactMarkdown>
            </h5>

            {/* Admission Process Description */}
            {specialization?.admissionProcess?.admissionProcessPoints?.desc?.map(
              (items, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    margin: "0 0 10px 0",
                    wordSpacing: "normal",
                    wordBreak: "normal",
                    display: "block",
                    textAlign: BigScreenLogic ? "left" : "",
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

            {/* Admission Process Key Points */}
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {specialization?.admissionProcess?.admissionProcessPoints?.admissionProcessKeyPoint?.map(
                (step, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      color: "black",
                      fontSize: "16px",
                      wordBreak: "normal",
                      display: "block",
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
                    </strong>{" "}
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
                      {step.desc}
                    </ReactMarkdown>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Top Universities Table */}
          <div className="d-flex justify-content-center flex-column mb-4">
            <h5>
              Top 10 Online MCom Colleges/Universities' Updated Fees List for
              2025
            </h5>
            <div className="overflow-x-auto">
              <DynamicCourseTable
                headers={["universityName", "semesterFees"]}
                data={[
                  {
                    universityName: "Manipal University",
                    semesterFees: "27,000",
                  },
                  {
                    universityName: "Lovely Professional University",
                    semesterFees: "23,000",
                  },
                  { universityName: "Jain University", semesterFees: "26,250" },
                  {
                    universityName: "Amity University",
                    semesterFees: "30,000",
                  },
                  {
                    universityName: "Sikkim Manipal University",
                    semesterFees: "22,500",
                  },
                  {
                    universityName: "Sharda University",
                    semesterFees: "17,500",
                  },
                  {
                    universityName: "Amrita University",
                    semesterFees: "22,500",
                  },
                  {
                    universityName: "Manglayatan University",
                    semesterFees: "9,000",
                  },
                ]}
                headerBgColor="#374151"
                headerTextColor="white"
                hoverColor="#D1D5DB"
                borderColor="#9CA3AF"
                borderRadius="8px"
                boxShadow="10px 5px 16px rgba(0, 0, 0, 0.2)"
              />
            </div>
          </div>

          {/* Who Can Apply Section */}
          <div className="d-flex justify-content-center flex-column">
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
                  specialization?.admissionProcess?.admissionProcessPoints
                    ?.whoCanApplyKeyPoints?.heading
                }
              </ReactMarkdown>
            </h5>
            {specialization?.admissionProcess?.admissionProcessPoints?.whoCanApplyKeyPoints?.desc?.map(
              (items, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    margin: "0 0 10px 0",
                    wordBreak: "normal",
                    display: "block",
                    textAlign: BigScreenLogic ? "left" : "",
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

            <ul className="list-disc list-inside space-y-2">
              {specialization?.admissionProcess?.admissionProcessPoints?.whoCanApplyKeyPoints?.keyPoints?.map(
                (item, index) => (
                  <li
                    key={index}
                    style={{
                      color: "black",
                      fontSize: "16px",
                      wordBreak: "normal",
                      display: "block",
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
                        {item.title + " : "}
                      </ReactMarkdown>
                    </strong>{" "}
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
                      {item.desc}
                    </ReactMarkdown>
                  </li>
                )
              )}
            </ul>

            <div
              style={{
                fontSize: "16px",
                color: "black",
                wordBreak: "normal",
                display: "block",
                textAlign: BigScreenLogic ? "left" : "",
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
                  specialization?.admissionProcess?.admissionProcessPoints
                    ?.whoCanApplyKeyPoints?.subHeading
                }
              </ReactMarkdown>
            </div>
          </div>

          {/* Is Online Section */}
          <div className="d-flex justify-content-center flex-column mt-3 mb-5">
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
                  specialization?.admissionProcess?.admissionProcessPoints
                    ?.isOnline?.heading
                }
              </ReactMarkdown>
            </h5>
            {specialization?.admissionProcess?.admissionProcessPoints?.isOnline?.desc?.map(
              (items, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    wordBreak: "normal",
                    display: "block",
                    textAlign: BigScreenLogic ? "left" : "",
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
        </div>
      </div>
    </>
  );
};

export default SpecializationAdmissionProcess;
