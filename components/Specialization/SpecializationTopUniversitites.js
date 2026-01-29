import React from "react";
import DynamicCourseTable from "./DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const SpecializationTopUniversitites = ({ CourseDetails, specialization }) => {
  const universities = [
    {
      universityName: "Manipal University",
      semesterFees: "₹27,000/- Semester",
      location: "Jaipur, Rajasthan",
      approvalsAccredation: "UGC | NAAC A++",
      downloadBrochure: "Add the actual brochure link",
      downloadBrochureButton: true,
    },
    {
      universityName: "Lovely Professional University (LPU)",
      semesterFees: "₹23,000/- Semester",
      location: "Phagwara, Punjab",
      approvalsAccredation: "UGC | NAAC A++",
      downloadBrochure: "#",
      downloadBrochureButton: true,
    },
    {
      universityName: "Jain University",
      semesterFees: "₹26,250/- Semester",
      location: "Bangalore, Karnataka",
      approvalsAccredation: "UGC | NAAC A++",
      downloadBrochure: "#",
      downloadBrochureButton: true,
    },
    {
      universityName: "Amity University",
      semesterFees: "₹30,000/- Semester",
      location: "Noida, Uttar Pradesh",
      approvalsAccredation: "UGC | NAAC A+",
      downloadBrochure: "#",
      downloadBrochureButton: true,
    },
    {
      universityName: "Sikkim Manipal University",
      semesterFees: "₹22,500/- Semester",
      location: "Gangtok, Sikkim",
      approvalsAccredation: "UGC | NAAC",
      downloadBrochure: "#",
      downloadBrochureButton: true,
    },
    {
      universityName: "Sharda University",
      semesterFees: "₹17,500/- Semester",
      location: "Greater Noida, Uttar Pradesh",
      approvalsAccredation: "UGC | NAAC A+",
      downloadBrochure: "#",
      downloadBrochureButton: true,
    },
    {
      universityName: "Amrita University",
      semesterFees: "₹22,500/- Semester",
      location: "Coimbatore, Tamil Nadu",
      approvalsAccredation: "UGC | NAAC A",
      downloadBrochure: "#",
      downloadBrochureButton: true,
    },
    {
      universityName: "Manglayatan University",
      semesterFees: "₹9,000/- Semester",
      location: "Aligarh, Uttar Pradesh",
      approvalsAccredation: "UGC | NAAC A+",
      downloadBrochure: "#",
      downloadBrochureButton: true,
    },
  ];

  const universities2 = [
    {
      universityName: "IGNOU",
      totalFees: "₹19,000 INR",
      location: "New Delhi",
      approvalsAccredation: "UGC | NAAC A++",
    },
    {
      universityName: "Mumbai University Online",
      totalFees: "₹20,000 INR",
      location: "Mumbai, Maharashtra",
      approvalsAccredation: "UGC | NAAC A++",
    },
    {
      universityName: "Algappa University Online",
      totalFees: "₹30,800 INR",
      location: "Karaikudi, Tamilnadu",
      approvalsAccredation: "UGC | NAAC A+",
    },
    {
      universityName: "Kurukshetra University Online",
      totalFees: "₹47,000 INR",
      location: "Kurukshetra, Haryana",
      approvalsAccredation: "UGC | NAAC A++",
    },
    {
      universityName: "Panjab University",
      totalFees: "₹25,000 INR",
      location: "Chandigarh, Punjab",
      approvalsAccredation: "UGC | NAAC A+",
    },
    {
      universityName: "Mizoram University",
      totalFees: "₹40,000 INR",
      location: "Aizawl, Mizoram",
      approvalsAccredation: "UGC | NAAC A",
    },
  ];

  const entranceExams = [
    {
      name: "CUET PG",
      description:
        "The Common University Entrance Test for Postgraduate (CUET PG) is a national-level examination organized by the National Testing Agency (NTA). It serves as a unified gateway for admission to postgraduate courses, including MCom, across numerous central and state universities in India.",
    },
    {
      name: "IPU CET",
      description:
        "The Indraprastha University Common Entrance Test (IPU CET) is conducted by Guru Gobind Singh Indraprastha University. It’s an important exam for candidates seeking entry into various postgraduate courses, including the Master of Commerce. The test assesses a wide range of abilities from technical knowledge.",
    },
    {
      name: "AMUEEE",
      description:
        "Although widely recognized for engineering programs, the Aligarh Muslim University Engineering Entrance Examination (AMUEEE) also includes tests for other specialized courses like MCom. Administered by Aligarh Muslim University, this entrance exam tests candidates on commerce-related subjects.",
    },
    {
      name: "TISSNET",
      description:
        "Primarily known for its focus on social sciences, the Tata Institute of Social Sciences National Entrance Test (TISSNET) also offers a general aptitude test that could apply to MCom candidates. This includes evaluating analytical and logical reasoning capabilities, English proficiency, and general awareness.",
    },
  ];

  const preparationTips = [
    {
      title: "Understand the Exam Format and Syllabus",
      description:
        "Familiarize yourself with the specific exam format and detailed syllabus for the MCom entrance exams you plan to take.",
    },
    {
      title: "Develop a Study Plan",
      description:
        "Create a realistic study schedule that breaks down your preparation into manageable segments.",
    },
    {
      title: "Use Recommended Books and Resources",
      description:
        "Invest in the recommended books specific to the MCom entrance exams. Titles such as 'Elements of Commerce' by Varun Kumar Rai and 'Objective Commerce' by Manoj Kaushik are particularly useful.",
    },
    {
      title: "Practice Previous Year Question Papers",
      description:
        "Solving previous years’ question papers is crucial. It helps you understand the exam pattern, question formats, and difficulty level.",
    },
    {
      title: "Join Coaching or Online Test Series",
      description:
        "If self-study isn’t enough, consider joining coaching classes or subscribing to online test series that offer structured learning and regular mock tests.",
    },
    {
      title: "Regular Revision",
      description:
        "Make sure to revise regularly. Regular revision reinforces learning and keeps information fresh in your mind as the exam date approaches.",
    },
    {
      title: "Stay Updated",
      description:
        "Check the official websites or trusted educational platforms for updates on exam dates, syllabus changes, or any other relevant information that could affect your preparation or exam strategy.",
    },
  ];

  return (
    <>
      <div
        id="CourseTopUniversities"
        style={{
          // background: "yellow",
          textAlign: "justify",
        }}
        className="pt--60"
      >
        <div className="d-flex justify-content-start gap-2 mb-4">
          <h5 className="mb-4">
            {" "}
            {CourseDetails?.course_type} {CourseDetails?.shortName} in{" "}
            {specialization.specialization_name} Top Universitites
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
                {specialization?.topUniversities?.pointOne?.heading}
              </ReactMarkdown>
            </h5>
            {specialization?.topUniversities?.pointOne?.desc?.map(
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

          <div className="d-flex justify-content-center flex-column my-5 ">
            <DynamicCourseTable
              headers={[
                "universityName",
                "semesterFees",
                "location",
                "approvalsAccredation",
                "downloadBrochure",
              ]}
              data={universities}
              headerBgColor="#374151"
              headerTextColor="white"
              hoverColor="#D1D5DB"
              borderColor="#9CA3AF"
              borderRadius="8px" // 🔹 Custom border-radius
              boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)" // 🔹 Custom shadow
            />
          </div>

          <div className="d-flex justify-content-center flex-column  ">
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
                {specialization?.topUniversities?.pointThree?.heading}
              </ReactMarkdown>
            </h5>
            {specialization?.topUniversities?.pointThree?.desc?.map(
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

          <div className="d-flex justify-content-center flex-column mt-2 mb-4 ">
            <h5 style={{ padding: "0", margin: "10px 0 15px 0" }}>
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
                  specialization?.topUniversities?.pointThree?.subPointsOne
                    ?.heading
                }
              </ReactMarkdown>
            </h5>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "20px",
                paddingBottom: "0",
                marginBottom: "0",
              }}
            >
              {specialization?.topUniversities?.pointThree?.subPointsOne?.keyPoints?.map(
                (exam, index) => (
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
                        {exam.title}
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
                      {exam.desc}
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
                margin: "0px 0 15px 0",
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
                  specialization?.topUniversities?.pointThree?.subPointsOne
                    ?.subHeading
                }
              </ReactMarkdown>
            </div>
          </div>

          <div className="d-flex justify-content-center flex-column  ">
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
                {specialization?.topUniversities?.pointFour?.heading}
              </ReactMarkdown>
            </h5>
            {specialization?.topUniversities?.pointFour?.desc?.map(
              (items, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    padding: "0",
                    margin: "0px 0 15px 0",
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
              {specialization?.topUniversities?.pointFour?.keyPoints?.map(
                (tip, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      color: "black",
                      fontSize: "16px",
                      padding: "0",
                      margin: "0 0 10px 0",
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
                        {tip.title}
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
                      {tip.desc}
                    </ReactMarkdown>
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

export default SpecializationTopUniversitites;
