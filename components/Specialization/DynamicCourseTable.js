import React from "react";

const DynamicSpecializationTable = ({
  headers = [],
  data = [],
  headerBgColor = "#E5E7EB",
  headerTextColor = "black",
  hoverColor = "#F3F4F6",
  borderColor = "#D1D5DB",
  borderRadius = "8px",
  boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)",
  BigScreenLogic
}) => {
  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        overflowX : BigScreenLogic ? "auto" : "scroll",
        borderRadius: borderRadius,
        boxShadow: boxShadow,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0",
          fontSize: "14px",
          color: "black",
          margin: 0,
        }}
      >
        {/* Table Header */}
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th
                key={index}
                style={{
                  backgroundColor: headerBgColor,
                  color: headerTextColor,
                  border: `1px solid ${borderColor}`,
                  padding: "12px",
                  textAlign: "left",
                  textTransform: "capitalize",
                  borderTopLeftRadius: index === 0 ? borderRadius : "0",
                  borderTopRightRadius:
                    index === headers.length - 1 ? borderRadius : "0",
                }}
              >
                {header === "salary"
                  ? "Salary Range"
                  : header === "careerLevel"
                  ? "Career Level"
                  : header === "jobRoles"
                  ? "Job Roles"
                  : header === "universityName"
                  ? "University Name"
                  : header === "semesterFees"
                  ? "Semester Fees (₹)"
                  : header === "approvalsAccredation"
                  ? "Approvals & Accreditation"
                  : header === "downloadBrochure"
                  ? "Download Brochure"
                  : header === "totalFees"
                  ? "Total Fees"
                  : header === "feeRange"
                  ? "Fee Range"
                  : header === "keySubjects"
                  ? "Key Subjects"
                  : header === "careerOpportunities"
                  ? "Career Opportunities"
                  : header === "CareerOpportunities"
                  ? "Career Opportunities"
                  : header === "topHiringFirms"
                  ? "Top Hiring Firms"
                  : header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                backgroundColor: rowIndex % 2 === 0 ? "#F9FAFB" : "#FFFFFF",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = hoverColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  rowIndex % 2 === 0 ? "#F9FAFB" : "#FFFFFF")
              }
            >
              {headers?.map((header, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    border: `1px solid ${borderColor}`,
                    padding: "12px",
                    textAlign: "left",
                    borderBottomLeftRadius:
                      rowIndex === data.length - 1 && colIndex === 0
                        ? borderRadius
                        : "0",
                    borderBottomRightRadius:
                      rowIndex === data.length - 1 &&
                      colIndex === headers.length - 1
                        ? borderRadius
                        : "0",
                  }}
                >
                  {header === "downloadBrochure" ? (
                    <a
                      href={row[header]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        // textDecoration: "none",
                        textAlign: "center",
                        display: "inline-block",
                        padding: "4px 16px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                    >
                      Download 
                    </a>
                  ) : (
                    row[header === "Specialization Courses" ? "title" : header]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicSpecializationTable;
