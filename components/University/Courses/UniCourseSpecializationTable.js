import Link from "next/link";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const UniCourseSpecializationTable = ({
  headers = [],
  data = [],
  headerBgColor = "#E5E7EB",
  headerTextColor = "black",
  hoverColor = "#F3F4F6",
  borderColor = "#D1D5DB",
  borderRadius = "8px",
  boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)",
  splitColumns = false, // New prop to control whether to split the data
  SubSlugCourseWithUniversity,
  slug,
  BigScreenLogic,
}) => {
  // Function to split data into columns only if there are multiple items
  const splitDataIntoColumns = (
    data,
    itemsPerColumn = Math.ceil(data.length / 2)
  ) => {
    if (data.length === 1) {
      return [data]; // If only one item, return a single column
    }

    const chunkedData = [];
    for (let i = 0; i < data.length; i += itemsPerColumn) {
      chunkedData.push(data.slice(i, i + itemsPerColumn));
    }
    return chunkedData;
  };

  // If only 1 item, force splitColumns to false
  const shouldSplit = splitColumns && data.length > 1;
  const chunkedData = shouldSplit ? splitDataIntoColumns(data) : [data];

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto", // Ensures scrolling on big screens
        borderRadius: borderRadius,
        boxShadow: boxShadow,
        display: "flex",
        flexDirection: "column",
        maxWidth: "100vw", // Prevents table from overflowing screen width
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
          color: "black",
          margin: 0,
          tableLayout: "auto", // Ensures flexibility in column width
          whiteSpace: "nowrap",
          borderRadius: "10%",
        }}
      >
        {/* Table Header */}
        <thead>
          <tr>
            {chunkedData?.length === 1 ? (
              <th
                style={{
                  backgroundColor: headerBgColor,
                  color: headerTextColor,
                  border: `1px solid ${borderColor}`,
                  padding: "12px",
                  textAlign: "left",
                  textTransform: "capitalize",
                  // borderTopLeftRadius: index === 0 ? borderRadius : "0",
                  // borderTopRightRadius:
                  //   index === headers.length - 1 ? borderRadius : "0",
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
                  {headers[1]}
                </ReactMarkdown>
              </th>
            ) : (
              headers?.map((header, index) => (
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
                    {header}
                  </ReactMarkdown>
                </th>
              ))
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr>
            {chunkedData?.map((column, columnIndex) => (
              <td
                key={columnIndex}
                style={{
                  padding: "0",
                  margin: "0",
                  verticalAlign: "top", // Ensures content starts at the top
                  width: "50%", // Ensures equal width
                  border: `1px solid ${borderColor}`,
                }}
              >
                {column?.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    style={{
                      backgroundColor:
                        rowIndex % 2 === 0 ? "#F9FAFB" : "#FFFFFF",
                      transition: "background-color 0.3s",
                      display: "flex",
                      alignItems: "center",
                      color: "black",
                      gap: "8px",
                      padding: "12px",
                      textAlign: "left",
                      width: "100%",
                      borderBottom: `1px solid ${borderColor}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row?.specialization_link ? (
                      <Link
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          fontWeight: "bold",
                          alignItems: "center",
                          width: "100%",
                          color: "blue",
                        }}
                        // onMouseEnter={(e) => {
                        //   e.target.style.backgroundColor = hoverColor;
                        // }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            rowIndex % 2 === 0 ? "#F9FAFB" : "#FFFFFF";
                        }}
                        target="_blank"
                        href={`/${slug}/${SubSlugCourseWithUniversity}/${row?.specialization_link}`}
                      >
                        {row?.specialization_name}
                        <FaExternalLinkAlt
                          style={{ color: "blue", marginLeft: "5px" }}
                        />
                      </Link>
                    ) : (
                      <span>
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
                          {row?.specialization_name}
                        </ReactMarkdown>
                      </span>
                    )}
                  </div>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UniCourseSpecializationTable;
