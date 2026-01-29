import React from "react";
import DynamicCourseTable from "./DynamicCourseTable";

const CourseTopUniversitites = ({ CourseDetails }) => {
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
            {CourseDetails?.course_type} {CourseDetails?.shortName} Course Top
            Universitites
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column  ">
            <h5 style={{ padding: "0", margin: "0 0 15px 0" }}>
              
              {CourseDetails?.topUniversities?.pointOne?.heading}
            </h5>
            {CourseDetails?.topUniversities?.pointOne?.desc?.map(
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

          <div className="d-flex justify-content-center flex-column my-5 ">
            {/* <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead
                style={{
                  fontSize: "16px",
                  color: "black",
                }}
              >
                <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                  {[
                    "University",
                    "Fee",
                    "Location",
                    "Approvals & Accreditations",
                    "Download Brochure",
                  ].map((header, index) => (
                    <th
                      key={index}
                      style={{ padding: "10px", border: "1px solid #ddd" }}
                    >
                      {header}
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
                {universities.map((uni, index) => (
                  <tr
                    key={index}
                    style={{
                      fontSize: "16px",
                      color: "black",
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                    }}
                  >
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {uni.name}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {uni.fee}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {uni.location}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {uni.approvals}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <a
                        href={uni.brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "none" }}
                      >
                        Download Brochure
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
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

          {/* <div className="d-flex justify-content-center flex-column ">
            <h5 style={{ padding: "0", margin: "0 0 15px 0" }}>
              {CourseDetails?.topUniversities?.pointTwo?.heading}
            </h5>
            {CourseDetails?.topUniversities?.pointTwo?.desc?.map(
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
          </div> */}

          {/* <div className="d-flex justify-content-center flex-column my-5 ">
            <DynamicCourseTable
              headers={[
                "universityName",
                "totalFees",
                "location",
                "approvalsAccredation",
              ]}
              data={universities2}
              headerBgColor="#374151"
              headerTextColor="white"
              hoverColor="#D1D5DB"
              borderColor="#9CA3AF"
              borderRadius="8px" // 🔹 Custom border-radius
              boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)" // 🔹 Custom shadow
            />
          </div> */}

          {/* <p
            style={{
              fontSize: "16px",
              color: "black",
            }}
          >
            <b>{CourseDetails?.topUniversities?.note?.title} : </b>{" "}
            {CourseDetails?.topUniversities?.note?.desc}
          </p> */}

          <div className="d-flex justify-content-center flex-column  ">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
              {CourseDetails?.topUniversities?.pointThree?.heading}
            </h5>
            {CourseDetails?.topUniversities?.pointThree?.desc?.map(
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
                  {items}
                </p>
              )
            )}
          </div>

          <div className="d-flex justify-content-center flex-column mt-2 mb-4 ">
            <h5 style={{ padding: "0", margin: "10px 0 15px 0" }}>
              {
                CourseDetails?.topUniversities?.pointThree?.subPointsOne
                  ?.heading
              }
            </h5>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "20px",
                paddingBottom: "0",
                marginBottom: "0",
              }}
            >
              {CourseDetails?.topUniversities?.pointThree?.subPointsOne?.keyPoints?.map(
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
                    <strong>{exam.title}:</strong> {exam.desc}
                  </li>
                )
              )}
            </ul>
            <p
              style={{
                fontSize: "16px",
                color: "black",
                padding: "0",
                margin: "0px 0 15px 0",
              }}
            >
              {
                CourseDetails?.topUniversities?.pointThree?.subPointsOne
                  ?.subHeading
              }
            </p>
          </div>

          <div className="d-flex justify-content-center flex-column  ">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
              {CourseDetails?.topUniversities?.pointFour?.heading}
            </h5>
            {CourseDetails?.topUniversities?.pointFour?.desc?.map(
              (items, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    padding: "0",
                    margin: "0px 0 15px 0",
                  }}
                >
                  {items}
                </p>
              )
            )}
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {CourseDetails?.topUniversities?.pointFour?.keyPoints?.map((tip, index) => (
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
                  <strong>{tip.title}:</strong> {tip.desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseTopUniversitites;
