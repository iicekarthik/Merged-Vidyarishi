import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const MainSpecializationTable = ({
  headers = [],
  data = [],
  headerBgColor = "#E5E7EB",
  headerTextColor = "black",
  hoverColor = "#F3F4F6",
  borderColor = "#D1D5DB",
  borderRadius = "8px",
  boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)",
  splitColumns = false, // New prop to control whether to split the data
}) => {
  // Function to split the data into chunks of size 20 for columns
  const splitDataIntoColumns = (data, itemsPerColumn = data?.length / 2) => {
    const chunkedData = [];
    for (let i = 0; i < data.length; i += itemsPerColumn) {
      chunkedData.push(data.slice(i, i + itemsPerColumn));
    }
    return chunkedData;
  };
  const [chunkedData, setchunkedData] = useState();
  useEffect(() => {
    const ChunkedData = splitColumns ? splitDataIntoColumns(data) : [data];
    setchunkedData(ChunkedData);
  }, [data]);

  // If splitColumns is true, split the data into columns, otherwise use the data as-is

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
          {data.length > 1 ? (
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
                  {header}
                </th>
              ))}
            </tr>
          ) : (
            <>
              {headers
                ?.slice(0, data?.length === 1 ? 1 : headers?.length)
                ?.map((header, index) => (
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
                    {header}
                  </th>
                ))}
            </>
          )}
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length > 1 ? (
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
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          textAlign: "left",
                          width: "100%",
                          cursor: "auto",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = hoverColor;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            rowIndex % 2 === 0 ? "#F9FAFB" : "#FFFFFF";
                        }}
                      >
                        {row?.title}
                      </button>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ) : (
            <tr>
              <td style={{ padding: "0", margin: "0" }}>
                <Link
                  style={{
                    backgroundColor: "#F9FAFB",
                    transition: "background-color 0.3s",
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    gap: "8px",
                    border: `1px solid ${borderColor}`,
                    padding: "12px",
                    textAlign: "left",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = hoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#F9FAFB";
                  }}
                  href={`/${data[0]?.specialization_link}`}
                >
                  {data[0]?.specialization_name}
                  <FaExternalLinkAlt style={{ color: "blue" }} />
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MainSpecializationTable;
