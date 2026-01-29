import React from "react";
import DynamicCourseTable from "../../Courses/DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const UniSpecializationCareerScope = ({
  CourseDetails,
  specializationDetails,
}) => {
  const careerData = [
    {
      careerLevel: "Entry-Level",
      jobRoles: "Business Analyst, Marketing Associate, Financial Analyst",
      salary: "₹6 LPA to ₹10 LPA",
    },
    {
      careerLevel: "Mid-Level",
      jobRoles: "Marketing Manager, Operations Manager, Project Manager",
      salary: "₹10 LPA to ₹15 LPA",
    },
    {
      careerLevel: "Senior-Level",
      jobRoles:
        "Chief Financial Officer (CFO), Director of Marketing, Senior Consultant",
      salary: "₹15 LPA to ₹30 LPA",
    },
  ];

  const industryData = [
    {
      industry: "Banking and Finance",
      recruiters: "HDFC Bank, ICICI Bank, Axis Bank",
      salary: "6-10 LPA",
    },
    {
      industry: "IT and Software",
      recruiters: "TCS, Infosys, Wipro",
      salary: "5-8 LPA",
    },
    {
      industry: "Consulting",
      recruiters: "Deloitte, KPMG, PwC",
      salary: "7-12 LPA",
    },
    {
      industry: "E-commerce",
      recruiters: "Amazon India, Flipkart",
      salary: "5-9 LPA",
    },
    {
      industry: "Healthcare",
      recruiters: "Apollo Hospitals, Fortis Healthcare",
      salary: "4-7 LPA",
    },
    {
      industry: "Manufacturing",
      recruiters: "Tata Motors, Hindustan Unilever",
      salary: "5-8 LPA",
    },
    { industry: "Education", recruiters: "BYJU’S, Vedantu", salary: "4-6 LPA" },
    {
      industry: "Telecom",
      recruiters: "Bharti Airtel, Vodafone Idea",
      salary: "5-7 LPA",
    },
    {
      industry: "FMCG",
      recruiters: "Nestlé, Procter & Gamble",
      salary: "6-9 LPA",
    },
    {
      industry: "Real Estate",
      recruiters: "DLF, Godrej Properties",
      salary: "5-8 LPA",
    },
  ];

  return (
    <>
      <div
        id="CourseCareerScope"
        style={{
          // background: "yellow",
          textAlign: "justify",
        }}
        className="pt--55"
      >
        <div className="d-flex justify-content-start gap-2">
          <h5 className="m-0">
            {" "}
            {CourseDetails?.course_type} {CourseDetails?.shortName} in{" "}
            {specializationDetails?.specialization_name} Career Scope
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column mb-5 ">
            <h5 className="">
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
                {specializationDetails?.career_scope?.subCareerScope?.heading}
              </ReactMarkdown>
            </h5>
            {specializationDetails?.career_scope?.subCareerScope?.desc?.map(
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
            <DynamicCourseTable
              headers={["careerLevel", "jobRole", "salaryRange"]}
              data={
                specializationDetails?.career_scope?.subCareerScope
                  ?.careerPoints
              }
              headerBgColor="#374151"
              headerTextColor="white"
              hoverColor="#D1D5DB"
              borderColor="#9CA3AF"
              borderRadius="8px" // 🔹 Custom border-radius
              boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)" // 🔹 Custom shadow
            />
          </div>

          <div className="d-flex justify-content-center flex-column mb-5 mt--40 ">
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
                  specializationDetails?.career_scope?.subCareerScope
                    ?.careerPointsTwo?.heading
                }
              </ReactMarkdown>
            </h5>

            <DynamicCourseTable
              headers={["industry", "recruiters", "salaryRange"]}
              data={
                specializationDetails?.career_scope?.subCareerScope
                  ?.careerPointsTwo?.keyPoints
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

export default UniSpecializationCareerScope;
