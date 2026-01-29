"use client";
import { useAppContext } from "@/context/Context";
import React from "react";
import ReactMarkdown from "react-markdown";

const DynamicCourseTable = ({
  headers = [],
  data = [],
  headerBgColor = "#E5E7EB",
  headerTextColor = "black",
  hoverColor = "#F3F4F6",
  borderColor = "#D1D5DB",
  borderRadius = "8px",
  boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)",
  BigScreenLogic = false,
}) => {
  const { isOpen, setIsOpen } = useAppContext();

  const DownloadButtonFunc = () => {
    setIsOpen(true);
  };

  const formatHeader = (header) => {
    const map = {
      salary: "Salary Range",
      careerLevel: "Career Level",
      jobRoles: "Job Roles",
      universityName: "University Name",
      semesterFees: "Semester Fees (₹)",
      "semesterFees / Annual Fees": "Semester / Annual Fees (₹)",
      approvalsAccredation: "Approvals & Accreditation",
      downloadBrochure: "Download Brochure",
      totalFees: "Total Fees",
      feeRange: "Fee Range",
      keySubjects: "Key Subjects",
      careerOpportunities: "Career Opportunities",
      CareerOpportunities: "Career Opportunities",
      topHiringFirms: "Top Hiring Firms",
      "Specialization Courses": "Specialization Courses",
    };
    return map[header] || header;
  };

  // ------------------------------
  // 🔹 Helper: Get cell value based on header type
  // ------------------------------
  const getCellValue = (header, row) => {
    switch (header) {
      case "semesterFees / Annual Fees":
        return (
          row.matchedCourses?.[0]?.semesterFeeRange ||
          row.matchedCourses?.[0]?.annualFeeRange ||
          "N/A"
        );

      case "approvalsAccredation": {
        if (!Array.isArray(row.accredation)) return "N/A";

        const names = [
          ...new Set(
            row.accredation.map((item) => item.shortName).filter(Boolean)
          ),
        ];

        return names.length > 0 ? names.join(", ") : "N/A";
      }

      case "Specialization Courses":
        return row.title || "N/A";

      case "downloadBrochure":
        return (
          <button
            onClick={DownloadButtonFunc}
            style={{
              display: "inline-block",
              textAlign: "center",
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
          </button>
        );

      // ⭐ ADD LINK ONLY FOR UNIVERSITY NAME
      case "universityName":
        return `[${row.universityName}](/${row.universityLink})`;

      default:
        return row[header] ?? "N/A";
    }
  };

  // ------------------------------
  // 🔹 Render
  // ------------------------------
  return (
    <div
      style={{
        width: "100%",
        overflowX: BigScreenLogic ? "auto" : "scroll",
        borderRadius,
        boxShadow,
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
        }}
      >
        {/* ----------------- Table Header ----------------- */}
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                style={{
                  backgroundColor: headerBgColor,
                  color: headerTextColor,
                  border: `1px solid ${borderColor}`,
                  padding: "12px",
                  textAlign: "left",
                  textTransform: "capitalize",
                  borderTopLeftRadius: i === 0 ? borderRadius : "0",
                  borderTopRightRadius:
                    i === headers.length - 1 ? borderRadius : "0",
                }}
              >
                {formatHeader(header)}
              </th>
            ))}
          </tr>
        </thead>

        {/* ----------------- Table Body ----------------- */}
        <tbody>
          {data.map((row, rowIndex) => (
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
              {headers.map((header, colIndex) => (
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
                    getCellValue(header, row)
                  ) : (
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              // color: "#1D4ED8",
                              textDecoration: "none",
                              // fontWeight: 600,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.textDecoration =
                                "underline")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.textDecoration = "none")
                            }
                          />
                        ),
                      }}
                    >
                      {String(getCellValue(header, row))}
                    </ReactMarkdown>
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

export default DynamicCourseTable;
