import React from "react";
import DynamicCourseTable from "./DynamicCourseTable";
import CourseSpecializationTable from "./SpecializationSpecializationTable";

const MainSpecializations = ({ CourseDetails, BigScreenLogic }) => {
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
              {CourseDetails?.specializations?.specialOne?.heading}
            </h5>
            {CourseDetails?.specializations?.specialOne?.desc?.map(
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
                data={CourseDetails?.specializations?.specializationList}
                headerBgColor="#374151"
                headerTextColor="white"
                hoverColor="#D1D5DB"
                borderColor="#9CA3AF"
                borderRadius="8px" // 🔹 Custom border-radius
                boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)" // 🔹 Custom shadow
                splitColumns={true}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center flex-column mt-5 mb-3">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
              {CourseDetails?.specializations?.specialTwo?.heading}
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
            {/* <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                marginTop: "20px",
                border: "2px solid black",
              }}
            >
              <thead
                style={{
                  fontSize: "16px",
                  color: "black",
                }}
              >
                <tr style={{ backgroundColor: "#ebebeb" }}>
                  {[
                    "Specialization",
                    "Fee Range (INR)",
                    "Key Subjects",
                    "Career Opportunities",
                    "Top Hiring Firms",
                  ].map((heading, index) => (
                    <th
                      key={index}
                      style={{
                        padding: "10px",
                        border: "2px solid black",
                        fontSize: "16px",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                style={{
                  fontSize: "16px",
                  color: "black",
                }}
              >
                {mcomSpecializations.map((course, index) => (
                  <tr key={index}>
                    <td style={{ padding: "8px", border: "2px solid black" }}>
                      {course.specialization}
                    </td>
                    <td style={{ padding: "8px", border: "2px solid black" }}>
                      {course.feeRange}
                    </td>
                    <td style={{ padding: "8px", border: "2px solid black" }}>
                      {course.keySubjects}
                    </td>
                    <td style={{ padding: "8px", border: "2px solid black" }}>
                      {course.careerOpportunities}
                    </td>
                    <td style={{ padding: "8px", border: "2px solid black" }}>
                      {course.topHiringFirms}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <DynamicCourseTable
              BigScreenLogic={BigScreenLogic}
              headers={[
                "specialization",
                "feeRange",
                "keySubjects",
                "careerOpportunities",
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

export default MainSpecializations;
