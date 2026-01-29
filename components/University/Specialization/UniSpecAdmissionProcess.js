import React from "react";
import DynamicCourseTable from "../../Courses/DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const UniSpecializationsAdmissionProcess = ({
  CourseDetails,
  specializationDetails,
}) => {
  const universities = [
    { universityName: "Manipal University", semesterFees: "27,000" },
    {
      universityName: "Lovely Professional University",
      semesterFees: "23,000",
    },
    { universityName: "Jain University", semesterFees: "26,250" },
    { universityName: "Amity University", semesterFees: "30,000" },
    { universityName: "Sikkim Manipal University", semesterFees: "22,500" },
    { universityName: "Sharda University", semesterFees: "17,500" },
    { universityName: "Amrita University", semesterFees: "22,500" },
    { universityName: "Manglayatan University", semesterFees: "9,000" },
  ];

  const eligibilityCriteria = [
    {
      title: "Graduates from Commerce Background",
      description:
        "Individuals who have completed their undergraduate studies in commerce-related fields such as BCom, BBA in Finance, or Bachelor of Economics are prime candidates for an online MCom degree in India.",
    },
    {
      title: "Professionals Seeking Advanced Skills",
      description:
        "Working professionals in fields like accounting, banking, finance, and business can enhance their expertise and advance their careers by pursuing an online MCom degree course that provides advanced knowledge and skills.",
    },
    {
      title: "Aspirants of Educated Careers",
      description:
        "An online MCom degree in India can benefit those pursuing teaching or research positions in commerce and economics. This degree is particularly valuable for those looking to deepen their expertise in specialized commerce subjects.",
    },
    {
      title: "Career Changers",
      description:
        "Individuals from non-commerce backgrounds interested in shifting to commerce-related fields may apply for an online MCom degree in India, provided they meet the basic educational prerequisites set by the university.",
    },
    {
      title: "Self Learners",
      description:
        "Many Online colleges and universities in India offer an online MCom degree to self-learning applicants. It expands the diversity and perspective within their programs. However, students must meet the specific eligibility criteria related to educational qualifications.",
    },
  ];

  const CurrentYear = new Date().getFullYear();

  return (
    <>
      <div
        id="CourseAdmissionProcess"
        style={{
          // background: "yellow",
          textAlign: "justify",
        }}
        className="pt--55"
      >
        <div className="d-flex justify-content-start gap-2 mb-4">
          <h5 className="mb-2">
            {CourseDetails?.course_type} {CourseDetails?.shortName}
            {" in "}
            {specializationDetails?.specialization_name} Admission Process
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column  ">
            <h5 style={{ padding: "0 0", margin: "0 0 15px 0" }}>
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
                  specializationDetails?.admissionProcess
                    ?.admissionProcessPoints?.heading
                }
              </ReactMarkdown>
            </h5>
            {specializationDetails?.admissionProcess?.admissionProcessPoints?.desc?.map(
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
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {specializationDetails?.admissionProcess?.admissionProcessPoints?.admissionProcessKeyPoint?.map(
                (step, index) => (
                  <li
                    key={index}
                    style={{
                      // marginBottom: "10px",
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

          <div className="d-flex justify-content-center flex-column mt-2 mb-5 ">
            <h5 style={{ padding: "0", margin: "0 0 15px 0" }}>
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
                  specializationDetails?.admissionProcess
                    ?.admissionProcessPoints?.whoCanApplyKeyPoints?.heading
                }
              </ReactMarkdown>
            </h5>
            {specializationDetails?.admissionProcess?.admissionProcessPoints?.whoCanApplyKeyPoints?.desc?.map(
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
            <ul
              style={{
                fontSize: "16px",
                color: "black",
                padding: "0 0 0 20px",
                margin: "0 0 10px 0",
              }}
              className="list-disc list-inside "
            >
              {specializationDetails?.admissionProcess?.admissionProcessPoints?.whoCanApplyKeyPoints?.keyPoints?.map(
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
                {
                  specializationDetails?.admissionProcess
                    ?.admissionProcessPoints?.whoCanApplyKeyPoints?.subHeading
                }
              </ReactMarkdown>
            </div>
          </div>

          <div className="d-flex justify-content-center flex-column mt-3 mb-5 ">
            <h5 style={{ padding: "0", margin: "0 0 15px 0" }}>
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
                  specializationDetails?.admissionProcess
                    ?.admissionProcessPoints?.isOnline?.heading
                }
              </ReactMarkdown>
            </h5>
            {specializationDetails?.admissionProcess?.admissionProcessPoints?.isOnline?.desc?.map(
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
        </div>
      </div>
    </>
  );
};

export default UniSpecializationsAdmissionProcess;
