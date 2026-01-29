import React from "react";
import styled from "styled-components";

const JsonToTableWrapper = styled.div`
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th,
    td {
      padding: 8px 12px;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #f5f5f5;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  }
`;

const tableStyles = {
  wrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    marginTop: "1rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    color: "#2d3748",
    backgroundColor: "#ffffff",
  },
  thead: {
    background: "linear-gradient(to right, #2563eb, #4f46e5)",
    color: "#ffffff",
    textTransform: "uppercase",
    fontSize: "12px",
    letterSpacing: "0.05em",
  },
  th: {
    padding: "12px 16px",
    borderBottom: "1px solid #e2e8f0",
    fontWeight: "600",
    textAlign: "left",
  },
  tbody: {
    backgroundColor: "#ffffff",
  },
  tr: {
    transition: "background-color 0.2s ease",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #edf2f7",
    color: "#2d3748",
    whiteSpace: "nowrap",
  },
  altRow: {
    backgroundColor: "#f9fafb",
  },
  hoverRow: {
    backgroundColor: "#ebf4ff",
  },
  naText: {
    color: "#a0aec0",
    fontStyle: "italic",
  },
};

const JsonToTableClient = ({ data }) => {
  const { fields } = data;

  if (!fields || !fields.json || fields.json.length === 0) {
    return <div>No data available</div>;
  }

  // Extract headers from the first object in the JSON array
  const headers = Object.keys(fields.json[0]);

  return (
    <JsonToTableWrapper style={tableStyles.wrapper}>
      <table style={tableStyles.table}>
        <thead style={tableStyles.thead}>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={tableStyles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={tableStyles.tbody}>
          {fields.json.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                ...tableStyles.tr,
                ...(rowIndex % 2 === 0 ? tableStyles.altRow : {}),
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  tableStyles.hoverRow.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  rowIndex % 2 === 0
                    ? tableStyles.altRow.backgroundColor
                    : "#ffffff")
              }
            >
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} style={tableStyles.td}>
                  {row[header] || <span style={tableStyles.naText}>N/A</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </JsonToTableWrapper>
  );
};

export default JsonToTableClient;
