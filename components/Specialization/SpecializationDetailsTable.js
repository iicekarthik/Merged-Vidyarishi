import React from "react";
import ReactMarkdown from "react-markdown";

const SpecializationDetailsTable = ({
  CourseDetails,
  filteredUniversities,
  BigScreenLogic,
  specialization,
}) => {
  return (
    <div
      style={{
        marginTop: "40px",
        marginBottom: "-40px",
        width: "100%",
        overflow: "hidden",
        overflowX: BigScreenLogic ? "hidden" : "scroll",
        paddingRight: "20px",
        paddingLeft: "20px",
      }}
    >
      <table
        style={{
          borderCollapse: "separate",
          borderSpacing: "0",

          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid #19233550",
          fontSize: "14px",
          color: "black",
        }}
      >
        <thead
          style={{
            fontSize: "16px",
            color: "black",
          }}
        >
          <tr
            style={{
              backgroundColor: "#b966e721",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {[
              "Degree",
              "Full Form",
              "Specialization",
              "Duration",
              "Eligibility",
              "Semester Fee Range",
              "Learning Mode",
              "EMI Available",
            ].map((item, index, arr) => (
              <th
                key={index}
                style={{
                  padding: "12px 16px",
                  fontWeight: "600",
                  border: "1px solid #19233550", // Header border
                  borderTopLeftRadius: index === 0 ? "12px" : "0",
                  borderTopRightRadius:
                    index === arr?.length - 1 ? "12px" : "0",
                }}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specialization?.overviewTableDetails?.map((item, index) => (
            <tr
              key={index}
              style={{ backgroundColor: "#fff", textAlign: "center" }}
            >
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
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
                  {item?.degree}
                </ReactMarkdown>
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
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
                  {item?.fullName}
                </ReactMarkdown>
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
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
                  {item?.Specialization}
                </ReactMarkdown>
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
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
                  {item?.duration}
                </ReactMarkdown>
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
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
                  {item?.eligibility}
                </ReactMarkdown>
              </td>
              {/* <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                {filteredUniversities?.registrationFee || item?.registrationFee}
              </td> */}
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
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
                  {item?.annualFeeRange || item?.semesterFee}
                </ReactMarkdown>
              </td>
              {/* <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                {filteredUniversities?.examFee || item?.examFee}
              </td> */}

              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
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
                  {item?.learningMode}
                </ReactMarkdown>
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
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
                  {item?.emiAvailable}
                </ReactMarkdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpecializationDetailsTable;
