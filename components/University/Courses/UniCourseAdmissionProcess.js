import React from "react";
import DynamicCourseTable from "../../Courses/DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const UniCourseAdmissionProcess = ({ CourseDetails }) => {
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
            {CourseDetails?.course_type} {CourseDetails?.shortName} Course
            Admission Process
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column  ">
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
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {CourseDetails?.admissionProcess?.admissionProcessPoints?.admissionProcessKeyPoint?.map(
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
                        {(step.title+ " : ")}
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

          {/* <div className="d-flex justify-content-center flex-column mb-4  mt--20">
            <h5 style={{ padding: "0", margin: "0 0 15px 0" }}>
              Top 10 Online {CourseDetails?.course_type}{" "}
              {CourseDetails?.shortName} Colleges/Universities' Updated Fees
              List for {CurrentYear}
            </h5>
            <div className="overflow-x-auto">
            // bleow commented
           <table className="w-full border-collapse border border-gray-300">
                <thead
                  style={{
                    fontSize: "16px",
                    color: "black",
                    padding: "0",
                    margin: "0 0 10px 0",
                  }}
                >
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      University Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Fees Per Semester (INR)
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
                  {universities.map((university, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {university.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {university.fees}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> 
              <DynamicCourseTable
                headers={["universityName", "semesterFees"]}
                data={universities}
                headerBgColor="#374151"
                headerTextColor="white"
                hoverColor="#D1D5DB"
                borderColor="#9CA3AF"
                borderRadius="8px" // 🔹 Custom border-radius
                boxShadow="10px 5px 16px rgba(0, 0, 0, 0.2)" // 🔹 Custom shadow
              />
            </div>
          </div> */}

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
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      
                    />
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
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      
                    />
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
        </div>
      </div>
    </>
  );
};

export default UniCourseAdmissionProcess;
